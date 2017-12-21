const axios = require('axios')

class Vision {
  static visionPost(req, res) {
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
      let NIK = rawData[2].slice(3)
      let nama = rawData[3]
      let alamat = rawData[10]
      res.status(200).json({
        result : rawData,
        NIK : NIK,
        nama : nama,
        alamat : alamat
      })
    })
    .catch( err => {
      console.log('eroor', err)
      res.status(500).send(err)
    })
  }

}

module.exports = Vision