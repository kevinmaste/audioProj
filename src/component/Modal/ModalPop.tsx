import React, {useEffect, useState} from 'react';
import {Backdrop, Box, Button, LinearProgress, Modal, Typography} from "@mui/material";
import axios from "axios";
import {LinearBarTransformCSS} from "./ui";

// @ts-ignore
import bip from "assets/ringtone/bip-2.mp3"

import {ring} from "./ring";

type modalProps={
    open:boolean;
    handleClose:()=>void;
    infos:{
        artist:string;
        songName:string;
        thumbnails:string;
    };
    videoId:string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 370,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
function ModalPop({open,handleClose,infos,videoId}:modalProps) {

    const [pourcent,setPourcent]=useState<number>(-10)
    //permet juste le changement d'état
    const [update,setUpdate]=useState<number>(0)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setPourcent(prevState => prevState >=100 ? 0 : prevState+10)
        },800)
        return ()=>clearInterval(timer)
    },[update])

    //this is the fonction for download video
    const handleDownload = async (videoId:string,songName:string)=>{
        setUpdate(1)
        try {
            const response = await
                axios.get(`http://localhost:8080/api//download/${videoId}?name=${songName}`,
                    {responseType: 'blob'})
            //console.log('data is ',response.data)
            //il faut créer un URL telechargarble en front-end=
            const url = window.URL.createObjectURL(new Blob([response.data]))

            console.log('url is ',url)
            const link = document.createElement("a")
            link.href = url;
            link.setAttribute("download",`${songName}.mp3`);
            document.body.appendChild(link);

            //permit to start the download when we click the fonction
            link.click()

            //clean up and remove the link
            //  link.parentNode?.removeChild(link)

        }catch (e) {
            console.log("L'erreur est : ",e)
        }
        setPourcent(100)
        if (pourcent===100)
        {
            console.log("je suis ici car c'est a 100%")
            console.log('bib is :',bip)
            ring(bip)
        }

    }


    console.log("pourcent est egal a :",pourcent)
    const handleDownloadAndClose = ()=>{
        //on peut fusionner les fonctions ici
    }

    return (
        <>
            {/*Voir si on ne peut pas mettre l'image en background , pour bien voir*/}
            <div>
                { /*Pour le box qui va suivre voir material UI */}
                {(open && pourcent !==100) && (
                    <Backdrop open={open} onClick={handleClose}
                        sx={{display:"block",background:"bottom"}}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' ,background:"#fff"}}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearBarTransformCSS
                                    variant="determinate"
                                    value={pourcent}
                                    sx={{
                                        height: "10px",
                                        borderRadius: "5px"
                                }}
                                />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" color="text.secondary">{`${Math.round(
                                    pourcent,
                                )}%`}
                                </Typography>
                            </Box>
                        </Box>
                    </Backdrop>
                )}
                <Modal
                    open={open && pourcent !== 100}
                    onClose={handleClose}
                    aria-labelledby={"child-modal-title"}
                    aria-describedby={'child-modal-description'}
                >
                    <Box sx={{...style,width:370}}>
                            <div>
                                <img src={infos.thumbnails} alt={infos.artist} width={"40px"} height={"40px"}/>
                            </div>
                            <h2 id={"child-modal-title"}>Download</h2>
                            <p id={"child-modal-description"}>Do you want to download :<br/> {infos.artist} - <span style={{fontWeight:"bold"}}>{infos.songName}</span>  </p>
                            <Button onClick={()=>handleDownload(videoId,infos.songName)}>Download</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </Box>
                </Modal>
            </div>
        </>
        
    );
}

export default ModalPop;