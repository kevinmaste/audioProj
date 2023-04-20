import React, {useEffect, useRef, useState} from 'react';
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


    //audio.then((res)=>setMusicTracks(res))

    useEffect(() => {



       audio.then((res) => {
            setMusicTracks(res);
            waveRef.current?.load(res[musicindex].musique || piste);
        });

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
        waveRef.current?.on('finish',()=>{
            setInaction(false)
            setMusicindex((prevState)=>(prevState+1)%musicTracks.length)
        })

        //waveRef.current?.load(musicTracks[musicindex]?.musique || piste)

        //waveRef.current?.load(musicTracks[musicindex]?.musique)

        // waveRef.current = wavesurfer
        //destroyer
        return () => {
            waveRef.current?.destroy()
        }
    }, [audio,musicindex])


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
        setMusicindex((prev)=>(prev+1)% musicTracks.length)
    }

    const handlePreviousTrack = ()=>{
        setMusicindex((prev)=>(prev-1 +musicTracks.length)% musicTracks.length)

    }
    console.log('the setMusicTrack took :',musicTracks)
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
