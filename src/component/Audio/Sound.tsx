import React, {useEffect, useRef, useState} from 'react';
import WaveSurfer from 'wavesurfer.js'
import {Button} from "@mui/material";
import {ButtonsContainer, Container, WavesurferContainer} from "./ui";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

type AudioFile ={
    audio:string
}
function Sound({audio}:AudioFile) {

    //for using wavesurfer element
    const waveSurferRef = useRef<HTMLDivElement>(null)
    const waveRef = useRef<WaveSurfer>()
    const [inAction,setInaction] = useState<boolean>()


    useEffect(() => {
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
        console.log('audio is :',audio)
        waveRef.current.load(audio)
        // waveRef.current = wavesurfer
        //destroyer
        return () => {
            waveRef.current?.destroy()
        }
    }, [audio])


    const handlePlayPause =()=>{

        const isPlaying = waveRef.current?.isPlaying() ?? false
        if(isPlaying){
            waveRef.current?.pause()
        }else {
            waveRef.current?.play()
        }

        setInaction(!isPlaying)

    }



    return (
        <Container>
            <WavesurferContainer ref={waveSurferRef} ></WavesurferContainer>
            <ButtonsContainer onClick={handlePlayPause}>
                {inAction ? (
                    <div>
                        <PauseIcon />
                    </div>
                ):(
                    <div>
                        <PlayArrowIcon/>
                    </div>
                )}
                <div>
                    <SkipPreviousIcon/>
                </div>
                <div>
                    <SkipNextIcon/>
                </div>
                <div>
                    <FavoriteIcon/>
                </div>
            </ButtonsContainer>
        </Container>
    );
}

export default Sound;