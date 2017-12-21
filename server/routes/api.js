const express = require('express')
const router = express.Router()
const { createUser,
  findById, 
  findByIdAndUpdate,
  getAllUsers,
  findByIdAndRemove
  } = require('../controllers/userCtrl.js')
const Vision = require('../controllers/visionController')


// ================= users 
router.post('/users', createUser)

router.get('/users/:email', findById)

router.put('/users/:id', findByIdAndUpdate)

router.get('/users', getAllUsers)

router.delete('/users/:id', findByIdAndRemove)

router.post('/vision', Vision.visionPost)

module.exports = router