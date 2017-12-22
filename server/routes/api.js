const express = require('express')
const router = express.Router()
const axios = require('axios')
const { createFaceListId, addingFaceId, getFacelist, faceDetect, findSimilars } = require('../middleware/facialDetection')

const { createUser,
  findById, 
  findByIdAndUpdate,
  getAllUsers,
  findByIdAndRemove
  } = require('../controllers/userCtrl.js')
const Guest = require('../controllers/guestController')
const GuestBook = require('../controllers/guestBookController')




router.post('/addingfaceid', addingFaceId)

router.post('/facedetection', faceDetect, findSimilars)

router.post('/findsimilars', findSimilars)



// ================= users 

router.post('/users', createUser)

router.get('/users/:email', findById)

router.put('/users/:id', findByIdAndUpdate)

router.get('/users', getAllUsers)

router.delete('/users/:id', findByIdAndRemove)


router.get('/guests', Guest.findAllGuest)

router.get('/guestbook', GuestBook.getAll)

router.post('/guestbook', GuestBook.createBookGuest)

router.use('/upload', require('./uploads.js'))

module.exports = router


