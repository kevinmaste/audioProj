const fs = require('fs')
const os = require("os")
const path = require('path')
//this module help to determine the mimi type of each file
const mime = require('mime')
const {id} = require("yarn/lib/cli");
//c'est pour manipuler les files etc...



const documentDirectory = path.join(os.homedir(),"Documents")

console.log("document is",documentDirectory)
//le but est de create un dossier dans le bureau


const handleCreateFolder =async (req,res)=>{
    const name = req.params.name
    const folder =path.join(documentDirectory,name);

    try {
        fs.access(documentDirectory,fs.constants.W_OK,(e)=>{
            if(e){
                res.json({error: e.message})
            }else {
                if(!fs.existsSync(folder)){
                    fs.mkdirSync(folder)
                    res.json('the file is created')
                    //res.status(201).json({message:'the folder is create'})
                }else {
                    res.json('exit already')
                }
            }
        })
        //res.send('the file is created')
    }catch (e){
        res.status(500).json({error:e.message})
    }
}

//get the file
const getFilesInFolder = async (req,res)=>{
    const name = req.params.name;
    const folder =path.join(documentDirectory,name);
    let adding_element = []
    try {
        const files = fs.readdirSync(folder)
            .map(filename=> path.join(folder,filename))
            .filter(filename=>fs.lstatSync(filename).isFile())


        if (files.length === 0){res.json({message:'le dossier est vide'})}
        else {
            for (let i = 0; i < files.length; i++) {
                const item = files[i].split(`${folder}\\`)
                adding_element.push(item[1])
            }
            res.json({files:adding_element})
        }
    }catch (e) {
        res.json({error:e.message})
    }

}

const getMusicInFolder = async (req,res)=>{
    const name = req.params.name;
    const folder =path.join(documentDirectory,name);
    const musicId = Number(req.query.id)
    console.log('musicid type :',typeof musicId)
    let adding_element = []
    try {
        const files = fs.readdirSync(folder)
            .map(filename=> path.join(folder,filename))
            .filter(filename=>fs.lstatSync(filename).isFile())


        if (files.length === 0){res.json({message:'le dossier est vide'})}
        else {
            for (let i = 0; i < files.length; i++) {
                const item = files[i].split(`${folder}\\`)
                //const mimeType= mime.getType(item[1]);
                adding_element.push(item[1])

               /* if(mimeType && mimeType.startsWith('audio/')){
                    console.log("je suis ici et c'est bien un audio")
                    adding_element.push({file:item[1],mimeType})
                }*/
            }
            console.log('musique adding is :',adding_element)
            //explanation after
            const musicFile = adding_element[musicId];
            console.log('music file id is :',musicFile)
            const filePath = path.join(folder, musicFile);

            const stat = fs.statSync(filePath);

            res.writeHead(200, {
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size,
            });
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        }
    }catch (e) {
        res.json({error:e.message})
    }

}

const deleteTheFile = async (req,res)=>{
    const file = req.params.name;
    const folder = req.query.folderName
    const paths = path.join(documentDirectory,folder)
    const path_is_true = path.join(paths,file)

    console.log("true paht i s:",path_is_true)
    //const encodedPath = encodeURIComponent(name);
    //console.log("the encoding path is : ",encodedPath);
    /*
    To fix this, you can encode the file path using the encodeURIComponent function before sending it in the URL.
    This will replace the backslashes with %5C, which is the URL-encoded representation of a backslash.
    * */
    try {
        fs.unlink(path_is_true,(err)=>{
                if (err){
                    res.json({error:err.message})
                }
                res.json({message:"le file a été supprime"})
            })

    }catch (e) {
        res.json({error:e.message})
    }
}

const uploadToTheDocument = async (req,res)=>{
    res.json({message:"Files is upload"})
}

module.exports = {handleCreateFolder,getFilesInFolder,deleteTheFile,uploadToTheDocument,getMusicInFolder};