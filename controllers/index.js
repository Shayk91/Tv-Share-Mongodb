const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Show = require('../models/show')
const db = require('../db')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const SALT_ROUNDS = 11
const TOKEN_KEY = 'areallylonggoodkey'

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

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createShow = async (req, res) => {
  try {
    const show = await new Show(req.body)
    await show.save()
    return res.status(201).json(
      show,
    );
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
  deleteShow
}