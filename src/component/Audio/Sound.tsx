import React, {useEffect, useRef} from 'react';
import WaveSurfer from 'wavesurfer.js'
import {Button} from "@mui/material";
import {ButtonsContainer, Container, WavesurferContainer} from "./ui";

type AudioFile ={
    audio:string
}
function Sound({audio}:AudioFile) {

    //for using wavesurfer element
    const waveSurferRef = useRef<HTMLDivElement>(null)
    const waveRef = useRef<WaveSurfer>()

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

        //console.log(waveRef.current ==wavesurfer ? "vrai":"fauxq")
        //
        // waveRef.current = wavesurfer
        //destroyer
        return () => {
            waveRef.current?.destroy()
        }
    }, [audio])


    const playing =()=>{
        waveRef.current?.play()
    }
    const pause =()=>{
        waveRef.current?.pause()
    }
    return (
        <Container>
            <WavesurferContainer ref={waveSurferRef} ></WavesurferContainer>
            <ButtonsContainer>
                <Button onClick={playing}>Play</Button>
                <Button onClick={pause}>Pause</Button>
            </ButtonsContainer>
        </Container>
    );
}

export default Sound;