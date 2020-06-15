const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Show = new Schema(
  {
    advisories: { type: Array },
    awards: { type: Array },
    cast: { type: Array },
    crew: { type: Array },
    descriptionLang: { type: String },
    entityType: { type: String },
    genres: { type: Array },
    keywords: { type: Object },
    longDescriptison: { type: String },
    officialUrl: { type: String },
    origAirDate: { type: String },
    preferredImage: { type: Object },
    ratings: { type: Array },
    recommendations: { type: Array },
    releaseDate: { type: String },
    releaseYear: { type: Number },
    rootId: { type: String },
    runTime: { type: String },
    seriesId: { type: String },
    shortDescription: { type: String },
    subType: { type: String },
    title: { type: String },
    titleLang: { type: String },
    tmsId: { type: String, unique: true },
    totalEpisodes: { type: Number },
    totalSeasons: { type: String }
  },
  { timestamps: true },
)

module.exports = mongoose.model('shows', Show)