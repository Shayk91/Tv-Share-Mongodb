const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Show = require('../models/show')
const db = require('../db')
const axios = require('axios')
const networks = require('../assests/networks.json')
// const { getStartDate, getUpcomingEndDate } = require('../assests/date')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const SALT_ROUNDS = 11
const TOKEN_KEY = 'areallylonggoodkey'

const getStartDate = () => {
  let wholeDate = new Date().toLocaleString()
  let localDateArray = wholeDate.split(' ')
  let dateWithComma = localDateArray[0].split(',')
  let localDate = dateWithComma[0]
  let newLocalDateArray = localDate.split('/')
  let correctLocalDate = newLocalDateArray.join('-')
  let correctLocalDateArray = correctLocalDate.split('-')
  let localDay = correctLocalDateArray[2]
  let localTime = localDateArray[1]
  let localTimeArray = localTime.split(':')
  let localHour = localTimeArray[0]
  if (parseInt(localHour) < 10) {
    localHour = '0' + localHour
  }
  let date = new Date()
  let dateInEnglish = date.toISOString().split('.')
  let dateFormat = dateInEnglish[0]
  let dateArray = dateFormat.split('T')
  let smallDate = dateArray[0]
  let smallDateArray = smallDate.split('-')
  smallDateArray.splice(0, 1, localDay)
  let joinDate = smallDateArray.join('-')
  let time = dateArray[1]
  let timeArray = time.split(':')
  timeArray.splice(0, 1, localHour)
  let joinTime = timeArray.join(':')
  let newDate = joinDate + `T${joinTime}Z`;
  return newDate
}

const getUpcomingEndDate = (passedDate) => {
  let dateInEnglish = passedDate.split('.')
  let dateFormat = dateInEnglish[0]
  let dateArray = dateFormat.split('T')
  let time = dateArray[1]
  let timeArray = time.split(':')
  let hour = timeArray[0]
  let increment = 12
  if (parseInt(hour) < 12) {
    let newHour = parseInt(hour) + increment
    timeArray.splice(0, 1, newHour)
    let joinTime = timeArray.join(':')
    let newDate = dateArray[0] + `T${joinTime}`;
    return newDate
  } else {
    let newHour = parseInt(hour) + increment - 24
    if (newHour < 10) {
      newHour = '0' + newHour
    }
    timeArray.splice(0, 1, newHour)
    let joinTime = timeArray.join(':')
    let newDate = dateArray[0] + `T${joinTime}`;
    return getFutureDay(newDate)
  }
}

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await new User({
      username,
      email,
      password_digest
    })

    await user.save()

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    const token = jwt.sign(payload, TOKEN_KEY)
    return res.status(201).json({ user, token })
  } catch (error) {
    console.log(
      'You made it to the signUp controller, but there was an error :('
    )
    return res.status(400).json({ error: error.message })
  }
}

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email
      }

      const token = jwt.sign(payload, TOKEN_KEY)
      return res.status(201).json({ user, token })
    } else {
      res.status(401).send('Invalid Credentials')
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const verifyUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const legit = jwt.verify(token, TOKEN_KEY)
    if (legit) {
      res.json({ user })
    }
  } catch (e) {
    res.status(401).send('Not Authorized')
  }
}

const changePassword = async (req, res) => { }


const someBullshit = async (req, res) => {
  try {
    // await Show.init()
    const shows = await testShows()
    res.json(shows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const testShows = async () => {
  let tempArr = []
  let startDate = await getStartDate()
  let endDate = await getUpcomingEndDate(startDate)
  // console.log(startDate, endDate)
  let { data } = await axios.get(`https://data.tmsapi.com/v1.1/lineups/USA-HULU501-DEFAULT/grid?startDateTime=${startDate}&endDateTime=${endDate}&stationId=${networks.map((network) => network.stationId)}&imageAspectTV=4x3&imageSize=Lg&api_key=v5nfdpmz66hp2nd5t9gefcrc`)
  data.forEach(network => {
    network.airings.forEach(program => {
      tempArr.push(program.program.tmsId)
    })
  })
  let shows = await Show.find()
  let showIdArr = shows.map(show => show.tmsId)
  let returnShows = tempArr.filter(id => {
    return !showIdArr.includes(id)
  }).map(id => {
    try {
      return axios.get(`https://data.tmsapi.com/v1.1/programs/${id}?imageSize=Lg&imageAspectTV=4x3&api_key=v5nfdpmz66hp2nd5t9gefcrc`)
    } catch (error) {
      return null
    }
  })
  if (returnShows.length) {
    returnShows = await Promise.all(returnShows)
    returnShows = returnShows.map(show => {
      return show.data
    })
    await Show.collection.insertMany(returnShows);
  }
  returnShows.push(...shows.filter(show => {
    return tempArr.includes(show.tmsId)
  }))
  return returnShows
}

const createShow = async (req, res) => {
  try {
    // const show = await new Show(req.body)
    let show = await Show.findOne({ seriesId: req.body.tmsId })
    if (show) {
      return res.status(500).json({ error: "Show already exists" })
    } else {
      show = await new Show(req.body)
      await show.save()
      return res.status(201).json(
        show,
      );
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find()
    return res.status(200).json(shows)
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const getShowById = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findById(id)
    if (show) {
      return res.status(200).json(show);
    }
    return res.status(404).send('Show with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const updateShow = async (req, res) => {
  try {
    const { id } = req.params;
    await Show.findByIdAndUpdate(id, req.body, { new: true }, (err, show) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!show) {
        res.status(500).send('Show not found!');
      }
      return res.status(200).json(show);
    })
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const deleteShow = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Show.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send("Show deleted");
    }
    throw new Error("Show not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}



module.exports = {
  signUp,
  signIn,
  verifyUser,
  changePassword,
  createShow,
  getAllShows,
  getShowById,
  updateShow,
  deleteShow,
  someBullshit
}