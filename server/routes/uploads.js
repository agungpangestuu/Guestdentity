
const express = require('express')
const router = express.Router()
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const images = require('../middleware/uploadCheck.js')
// const upload = require('../controllers/uploadsController.js')
const uploaded = images.multer.single('file')
const Guest = require('../controllers/guestController')


router.post('/', function (req, res, next) {
    uploaded(req, res, function(err){
        if (err) {
            console.log(err)
            return res.status(400).json({
                message : "err"
            })
        } 
        else {
            next()
        }
    })
  }, images.sendUploadToGCS, Guest.visionGuestPost)

  



module.exports = router