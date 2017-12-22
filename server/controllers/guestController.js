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
              req.file.cloudStoragePublicUrl
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

    axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA6tkCsALPbiLlw038YHJ0izByVMcNgwU8',
      data, {
        headers : { 'Content-Type': 'application/json'}
      })
    .then( result => {
      //raw identitas nanti di edit setelah ada multer
      // finding name by index 'Nama' -1
      let rawData = result.data.responses[0].textAnnotations[0].description.split('\n')
      console.log(rawData)
      let index = rawData.findIndex(x => {
        return x === 'Nama'
      })
      
      if(index === -1) {
        res.status(400).json({
          message : 'try foto again'
        })
        return index
      }
      if(!rawData[index -1] === rawData[index-1].toUpperCase()) {
        res.status(400).json({
          message : 'try foto again'
        })
        return rawData
      }
      
      let objGuest = {
        nama : rawData[index-1],
        description : rawData
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
      console.log(err)
      res.status(500).json({
        message : "error internal server"
      })
    })
  }

}

module.exports = GuestController