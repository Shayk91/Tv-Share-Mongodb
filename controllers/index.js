const Show = require('../models/show');

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
  createShow,
  getAllShows,
  getShowById,
  updateShow,
  deleteShow
}