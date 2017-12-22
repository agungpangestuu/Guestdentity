const GuestBook = require('../models/guestBook-schema')



module.exports = {
    createBookGuest(req,res){
        let date = new Date().toLocaleString()
       
        let dataGuest = new GuestBook({
            name : req.body.name,
            necessities : req.body.keperluan,
            createdAt : date
        })
        dataGuest.save()
        .then( result => {
            console.log(result.createdAt)
            res.status(200).json({
                message : "Success to create GuestBook",
                data : result ,
                status : true 
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
    },
    getAll(req,res){
        GuestBook.find()
        .then(result => {
            res.status(200).json({
                message : "Success to get All",
                data : result
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
    }
}