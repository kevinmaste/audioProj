const express = require('express')
const router = express.Router();
const os = require("os")
const path = require('path')
const multer = require('multer')
const documentDirectory = path.join(os.homedir(),"Documents")
const {handleCreateFolder,getFilesInFolder,deleteTheFile,uploadToTheDocument,getMusicInFolder} = require('../controller/folder')

//cette fonction permet de controller ou nous allons mettre notre file, on na plus de controle

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const folderName = req.query.name
        cb(null,`${documentDirectory}\\${folderName}\\`)
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})


const upload = multer({storage:storage})


router.post('/createFolder/:name',handleCreateFolder)
router.get('/getFolderItem/:name',getFilesInFolder)
router.delete('/deleteItem/:name',deleteTheFile)
router.post('/uploadFile/',upload.single('file'),uploadToTheDocument)
router.get('/getMusic/:name?',getMusicInFolder)

module.exports = router