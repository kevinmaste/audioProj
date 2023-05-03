const  YoutubeMusicApi =require('youtube-music-api')
const ytdl =require('ytdl-core')
const ffmpeg = require('ffmpeg-static')
const {spawn} = require('child_process')

const songSearch = async (req,res)=>{
    const item = req.params.name
    const artistName = req.query.artist
    const fusionArtist = `${item} -${artistName}`

    console.log("artist is ",artistName)

    console.log('item is :',item)
    const api = new YoutubeMusicApi()

    api.initalize()
        .then((query, categoryName="song", _pageLimit = 1)=>{
            api.search(fusionArtist, 'song', _pageLimit).then(result=>{
                console.log("the resutat is",result.content[0])
                res.json(result.content[0])
            })
        }).catch(err=>{
            console.log(err)
        //put the status 500 after
        res.status(500).send({error:err.message})
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
                console.log(result)
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
       const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
       const audioOutputFile = `${songName}.mp3`

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
           video.pipe(ffmpegProcess.stdin);
           ffmpegProcess.stdout.pipe(require('fs').createWriteStream(audioOutputFile))
           ffmpegProcess.on('exit', () => {
               console.log("Audio file saved", audioOutputFile)
               res.download(audioOutputFile)
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
