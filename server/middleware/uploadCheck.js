"use  strict"
require("dotenv").config()
const path = require('path')

const Storage = require('@google-cloud/storage');

const bucketName = process.env.BUCKETNAME;


const storage = Storage({
    projectId : process.env.GCLOUD_PROJECT,
    keyFilename : process.env.KEYFILE_PATH
})

const bucket = storage.bucket(bucketName)

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${bucketName}/${filename}`
}

const sendUploadToGCS = (req,res,next) => {
    if (!req.file){
        return next()
    }
    const gcsname = Date.now() + req.file.originalname
    const file = bucket.file(gcsname)
    
    const stream = file.createWriteStream({
        metadata : {
            contentType : req.file.mimetype
        }
    })
    
    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })
    
    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        file.makePublic().then(()=>{
            console.log(req.file)
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
            next()
        })
        
    })

    stream.end(req.file.buffer)

}
const Multer = require("multer"),
      multer = Multer({
          storage : Multer.MemoryStorage,
          limits : {
              fileSize : 10 * 1024 * 1024
          },
          fileFilter: function (req, file, cb) {
            var filetypes = /jpeg|jpg|png/;
            var mimetype = filetypes.test(file.mimetype);
            var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
            if (mimetype && extname) {
              return cb(null, true);
            }
  
            cb("Error: File type not supported");
          }
        //   dest : "uploads/"
      })


module.exports = {
    multer,
    getPublicUrl,
    sendUploadToGCS
}