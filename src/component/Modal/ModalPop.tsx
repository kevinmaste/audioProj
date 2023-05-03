import React from 'react';
import {Box, Button, Modal} from "@mui/material";
import axios from "axios";
import {handleDownload} from "../../specialUtils/utils";


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

    return (
        <>
            {/*Voir si on ne peut pas mettre l'image en background , pour bien voir*/}
            <div>
                <Modal
                    open={open}
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