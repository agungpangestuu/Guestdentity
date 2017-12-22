const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  guestBookSchemas = new Schema({
  name : String,
  necessities : String,
  createdAt : {
    type : String
  }
})

const GuestBook = mongoose.model('GuestBook', guestBookSchemas)

module.exports = GuestBook