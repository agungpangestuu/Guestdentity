const express = require('express')
const router = express.Router()
const { createUser,
  findById, 
  findByIdAndUpdate,
  getAllUsers,
  findByIdAndRemove
  } = require('../controllers/userCtrl.js')
const Guest = require('../controllers/guestController')


// ================= users 
router.post('/users', createUser)

router.get('/users/:email', findById)

router.put('/users/:id', findByIdAndUpdate)

router.get('/users', getAllUsers)

router.delete('/users/:id', findByIdAndRemove)

router.get('/guests', Guest.findAllGuest)

router.post('/guests', Guest.visionGuestPost)

module.exports = router