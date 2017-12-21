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
      res.status(200).json({
        result : result.data

      })
    })
    .catch( err => res.status(500).send(err))
  }

}

module.exports = Vision
// router.post('/vision', (req, res) => {
//   let data = {
//     "requests": [
//       {
//         "image": {
//           "source": {
//             "imageUri":
//               req.body.uri
//           }
//         },
//         "features": [
//           {
//             "type": "TEXT_DETECTION",
//             "maxResults": 1
//           }
//         ]
//       }
//     ]
//   }
//   console.log('req.body: ', req.body)
//   axios.post(' https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA6tkCsALPbiLlw038YHJ0izByVMcNgwU8', 
//     data, {
//       headers: { 'Content-Type': 'application/json'}
//     })
//   .then(result => {
//     console.log(result)
//     res.send(result.data)
//   })
//   .catch(err => {
//     console.log('err: ', err)
//   })
// })
