const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guestSchema = new Schema({
  nama : String,
  description : Array,
  createdAt : {
    type : Date,
    default : Date.now
  }
})

const Guest = mongoose.model('Guest', guestSchema)

module.exports = Guest