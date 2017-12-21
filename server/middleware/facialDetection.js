
const URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/facelists/'
const URL_FaceId = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false'
const URL_FindSimilars = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/findsimilars'
const axios = require('axios')
const facialKey = 'd7e51a262fde430e8e62554eac309e82'
const faceListName = 'kookaburra'

require('dotenv').config()

const createFaceListId = (req, response, next) => {
  axios.put(URL + faceListName, {
    name: req.body.name,
    userData: req.body.userData
  }, {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": facialKey
      }
    })
    .then(res => {
      console.log('result Facial List: ', res.headers)
      next()
    })
    .catch(err => {
      console.log('err createFaceListId', err)
      response.status(500).send({ msg: err })
    })
}

const getFacelist = (req, response, next) => {
  axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": facialKey
    }
  })
    .then(res => {
      console.log('faceLists: ', res.data)
      next()
    })
    .catch(err => {
      console.log('err getFacelist: ', err)
      response.status(500).send({ msg: err })
    })

}

const addingFaceId = (req, response) => {
  console.log('body : ', req.body)
  // req.body = JSON.parse(req.body)
  console.log('ddadf', facialKey)
  console.log('req.headers: ', req.headers)
  let fileName = req.body.uniqueName
  let url = req.body.url
  console.log('url === : ', url)
  console.log('uniqueName ===== : ', fileName)
  axios.post(URL + faceListName + `/persistedFaces?userData=${fileName}`, {
    url: url
  }, {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": facialKey
      }
    })
    .then(res => {
      console.log('added FaceId: ', res)
      response.status(200).send({ data: res.data, msg: 'succes adding persistedFaceId' })
    })
    .catch(err => {
      // console.log('err addingFaceId ', err)
      response.status(500).send({ msg: err })
    })
}

const faceDetect = (req, response, next) => {
  axios.post(URL_FaceId, {
    url: req.body.url
  }, {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": facialKey
      }
    })
    .then(res => {
      console.log('faceDetect: ', res.data)
      req.body.faceId = res.data[0].faceId
      next()
      // response.status(200).send({ data: res.data, msg: 'succes create faceId'})
    })
    .catch(err => {
      console.log('err facedetect: ', err)
      response.status(500).send({ msg: err })
    })
}

const findSimilars = (req, response) => {
  axios.post(URL_FindSimilars, {
    'faceId': req.body.faceId,
    'faceListId': faceListName,
    'maxNumOfCandidatesReturned': 10,
    mode: 'matchPerson'
  }, {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": facialKey
      }
    })
    .then(res => {
      console.log('findSimilars: ', res.data)
      if (res.data.length === 0) {
        response.status(200).send({ data: res.data, msg: 'no matched' })
      } else {
        response.status(200).send({ data: res.data, msg: 'matched' })
      }
    })
    .catch(err => {
      console.log('err findsimilars: ', err)
      response.status(500).send({ msg: err })
    })
}


module.exports = {
  createFaceListId,
  addingFaceId,
  getFacelist,
  faceDetect,
  findSimilars
}