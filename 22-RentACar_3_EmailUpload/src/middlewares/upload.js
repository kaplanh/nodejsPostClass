"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: upload
// npm i multer

// Multer: UploadFile:
// https://expressjs.com/en/resources/middleware/multer.html
const multer = require('multer')

module.exports = multer({ // middleware
    storage: multer.diskStorage({
        destination: './upload/',//hangi klasör icine upload edeyim
        filename: function(req, file, returnCallback) {//hangi isimde kaydedeyim
//not:piyasada returnCallback yerine cb yazilir anlasilsin diye burda böyle yazdik
           //returnCallback(err, file.originalname)// err istemedigimiz icin 
            returnCallback(null, file.originalname) //kendi orj isminde       }
    })
})
