const axios = require('axios')
const Guest = require('../models/guest-schema')

class GuestController {
  static findAllGuest(req, res) {
    Guest.find()
    .then( guests => {
      res.status(200).json({
        message : 'list all Guest',
        guests : guests
      })
    })
    .catch( err => res.status(500).send(err))
  }

  static visionGuestPost(req, res) {
    let data = {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri":
                req.body.uri
            }
          },
          "features": [
            {
              "type": "TEXT_DETECTION",
              "maxResults": 1
            }
          ]
        }
      ]
    }

    axios.post(' https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA6tkCsALPbiLlw038YHJ0izByVMcNgwU8',
      data, {
        headers : { 'Content-Type': 'application/json'}
      })
    .then( result => {
      //raw identitas nanti di edit setelah ada multer
      let rawData = result.data.responses[0].textAnnotations[0].description.split('\n')

      let objGuest = {
        NIK : rawData[4],
        nama : rawData[5],
        alamat : rawData[11]
      }
      let guest = new Guest(objGuest)

      guest.save()
      .then( dataGuest => {
        res.status(200).json({
          message : 'success input guest',
          
          guest  : dataGuest
        })
      })
    })
    .catch( err => {
      res.status(500).send(err)
    })
  }

}

module.exports = GuestController