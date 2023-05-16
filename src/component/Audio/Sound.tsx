import React, {useContext, useEffect, useRef, useState} from 'react';
import WaveSurfer from 'wavesurfer.js'
//import {Button} from "@mui/material";
import {ButtonsContainer, Container, IconContainer, WavesurferContainer} from "./ui";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
//import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Music} from "./utils";
// @ts-ignore
import piste from 'assets/musique/song-2.mp3';
import * as process from "process";
import axios from "axios";
import {FolderHeight} from "../../pages/Home/Home";


/*interface AudioFile{
    audio: Promise<Music[]>
}*/

interface AudioFile{
    audio: Promise<Music[]>
}

function Sound({audio}:AudioFile) {

    //for using wavesurfer element
    const waveSurferRef = useRef<HTMLDivElement>(null)
    const waveRef = useRef<WaveSurfer>()
    const [inAction,setInaction] = useState<boolean>()
    const [musicindex,setMusicindex]=useState<number>(0)
    const [musicTracks, setMusicTracks]=useState<any[]>([])
    const [musicLink,setMusicLink]=useState<any>('')
    const FOLDER_NAME=process.env.REACT_APP_FOLDER_NAME

    //le contexte ne m'aide pas trop il se trouve dans un use Effect XD
    const [lengthFolder,setLengthFolder] =useContext(FolderHeight)

    //Ce useEffect permettra d'appeler le getFolder le mieux c'est de le mettre a un niveau plus haut et utiliser les contexte
    useEffect(()=>{
        async function getFolderLength(){
            const res = await axios.get(`http://localhost:8080/folder/getFolderItem/${FOLDER_NAME}`)
            setLengthFolder(res.data?.files.length)
        }
        getFolderLength()
    },[])

    //Ce useEffect permet d'appeler une musique depuis le serveur
    useEffect(()=>{
        async function getMusicLink(){
            console.log('-----------------------music index debut')
            console.log('index is up to : ',musicindex)
            console.log('-----------------------music index debut')
            try {
                const response = await axios.get(`http://localhost:8080/folder/getMusic/${FOLDER_NAME}?id=${musicindex}`,{
                    responseType: 'arraybuffer'
                })
                const dataBlob = new Blob([response.data], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(dataBlob);
                console.log('response is :',audioUrl)
                console.log('respnse data is :',typeof audioUrl)
                /*const i = window.URL.createObjectURL(new Blob([response.data]))
                console.log('i is :',i)*/
                //const url = response.data
                setMusicLink(audioUrl)
            }catch (e) {
                console.log('erreur is :',e)
            }

        }
        getMusicLink()
    },[musicindex,FOLDER_NAME])

    //audio.then((res)=>setMusicTracks(res))

    //Ce useEffect permet de jouer le wavesufer
    useEffect(() => {

       /*audio.then((res) => {
            setMusicTracks(res);
            waveRef.current?.load(res[musicindex]?.musique || piste);
        });*/
         waveRef.current = WaveSurfer.create({
            container: waveSurferRef.current!,
            waveColor: 'orange',
            progressColor: 'purple',
            responsive: true,
            cursorWidth: 0,
            barWidth: 1,
            height:70,
            hideScrollbar:true,
            //maxCanvasWidth:400
        })

        //when the music and we goind to the nex track
        waveRef.current?.on('finish',()=>{
            setInaction(false)
            setMusicindex((prevState)=>(prevState+1)%lengthFolder)

        })

        //we're playing when the music has charged
        if(musicindex !== 0){
            waveRef.current?.on('ready',()=>{
                waveRef.current?.play()
                setInaction(true)
            })
        }
        //waveRef.current?.load('C:\\Users\\kevin.bitoumbou-bibo\\Documents\\Music\\Ocean.mp3')

        //waveRef.current?.load(musicTracks[musicindex]?.musique || piste)

        waveRef.current?.load(musicLink || piste)

        // waveRef.current = wavesurfer
        //destroyer
        return () => {
            waveRef.current?.destroy()
        }
    }, [musicLink])


    const handlePlayPause = () => {
        const isPlaying = waveRef.current?.isPlaying() ?? false;
        if (isPlaying) {
            waveRef.current?.pause();
        } else {
            waveRef.current?.play();
        }
        setInaction(!isPlaying);
    };


    const handleNextTrack = ()=>{
        setMusicindex((prev)=>(prev+1)% lengthFolder)
    }

    const handlePreviousTrack = ()=>{
        setMusicindex((prev)=>(prev-1 +lengthFolder)% lengthFolder)

    }
    console.log('the MUSIC LINK took :',musicLink)
    console.log('length forlder is :',lengthFolder)
    return (
        <Container>
            <WavesurferContainer ref={waveSurferRef} ></WavesurferContainer>
            <ButtonsContainer onClick={handlePlayPause}>
                {inAction ? (
                    <IconContainer>
                        <PauseIcon />
                    </IconContainer>
                ):(
                    <IconContainer>
                        <PlayArrowIcon/>
                    </IconContainer>
                )}
                <IconContainer onClick={handlePreviousTrack}>
                    <SkipPreviousIcon/>
                </IconContainer>
                <IconContainer onClick={handleNextTrack}>
                    <SkipNextIcon/>
                </IconContainer>
                <IconContainer>
                    <FavoriteIcon/>
                </IconContainer>
            </ButtonsContainer>
        </Container>
    );
}



export default Sound;
