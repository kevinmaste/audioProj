const  YoutubeMusicApi =require('youtube-music-api')
const ytdl =require('ytdl-core')
const ffmpeg = require('ffmpeg-static')
const {spawn} = require('child_process')


//ça va nous permettre de mettre directement les song dans les dossier créer
const fs = require('fs')
const os = require("os")
const path = require('path')







//song 2 as the normal function
const songSearch =  async (req,res)=>{
    const item = req.params.name
    const artistName = req.query.artist
    const fusionArtist = `${item} -${artistName}`
    const api = new YoutubeMusicApi()

    console.log("artist is ",artistName)

    console.log('item is :',item)

    api.initalize()
        .then((query, categoryName="song", _pageLimit = 1)=>{
            api.search(fusionArtist, _pageLimit).then(result=>{
                console.log("the resutat is",result.content[0])
                //resultat = result.content[0];
                res.json(result.content[0])
            })
        }).catch(err=>{
        console.log(err)
        //put the status 500 after
      res.json(err)
    })
}



const songSuggestions = async (req,res)=>{
    const item = req.params.name
    console.log('item is :',item)
    const api = new YoutubeMusicApi()


    api.initalize()
        .then((query, categoryName="song", _pageLimit = 1)=>{
            api.getSearchSuggestions(item).then(result=>{
                //here get the search suggestion and take the good one
                console.log("result is of type:", typeof result)
                res.json(result)
            })
        }).catch(err=>{
        console.log(err)
        //put the status 500 after
        //res.status(404).send({error:err.message})
        res.json(err.message)

    })
}



const songGerenator = async (req,res)=>{
   try {
       const songName = req.query.name
       const videoId = req.params.id
       const enCodingSongName = encodeURIComponent(songName)
       const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
       const audioOutputFile = `${enCodingSongName}.mp3`

       if (ytdl.validateURL(videoUrl)) {
           const video = ytdl(videoUrl, {filter: 'audioonly'})
           const ffmpegProcess = spawn(ffmpeg, [
               '-i', 'pipe:0',
               '-vn',
               '-acodec', 'libmp3lame',
               '-f', 'mp3',
               '-'
           ], {
               stdio: ['pipe', 'pipe', 'pipe']
           });

           res.set({
               'Content-Disposition': `attachment; filename*=UTF-8''${enCodingSongName}`,
               'Content-Type': 'audio/mpeg'
           })
           video.pipe(ffmpegProcess.stdin);
           ffmpegProcess.stdout.pipe(res)
           ffmpegProcess.on('exit', () => {
               console.log("Audio file saved", audioOutputFile)
               //res.download(audioOutputFile)
           })
       } else {
            new Error("Invalid youtube video URL")
       }
   }catch (e){
       console.error(e)
       res.status(400).send({error:e.message})
   }
}



module.exports = {songSearch, songSuggestions,songGerenator}
