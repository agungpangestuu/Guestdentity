module.exports = {
    gcspost(req,res){
        res.status(200).json({
            message : "Your File Succes To uploads",
            link : req.file.cloudStoragePublicUrl
        })
    }
}