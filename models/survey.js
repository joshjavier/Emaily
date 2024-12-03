const mongoose = require('mongoose')
const RecipientSchema = require('./recipient')
const { Schema } = mongoose

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes:{
    type: Number,
    default: 0,
  },
  no:{
    type: Number,
    default: 0,
  },
})

mongoose.model('surveys', surveySchema)