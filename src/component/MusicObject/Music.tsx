import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import * as process from "process";
import {
    Button,
    Container,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Typography
} from "@mui/material";
import {MusicGetContext} from "../../App";
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {NavigationDiv} from "./ui";
import {Link} from "react-router-dom";
import {Alert} from "../Alert/Alert";
import {FolderHeight} from "../../pages/Home/Home";

function Music() {
    const FOLDER_NAME=process.env.REACT_APP_FOLDER_NAME
    const [musicTab,setMusicTab] =useContext(MusicGetContext)
    const [updateFileFolder,setUpdateFileFolder]=useState<number>(0)
    const [appearStact, setAppearStact]=useState<boolean>(false)

    const [,setLengthFolder]= useContext(FolderHeight)
    console.log('musicTab is =',musicTab.files)
    console.log('musicTab type is =',typeof musicTab.files)
    console.log('musicTab type is array =',Array.isArray(musicTab.files))


    useEffect(()=>{

        async function getMusicList(){
            const musicList = await axios.get(`http://localhost:8080/folder/getFolderItem/${FOLDER_NAME}`)
            setMusicTab(musicList.data)
            setLengthFolder(musicList.data.files.length)
            console.log("musique list is ",musicList.data)
        }
        getMusicList()

        if (updateFileFolder>0){
            setAppearStact(true)
        }
    },[FOLDER_NAME,updateFileFolder])

    const handleDelete = async (file_in_folder:string)=>{

        const encodingPath = encodeURIComponent(file_in_folder)
        console.log('encoding path:',encodingPath)

        const reponse = await axios.delete(`http://localhost:8080/folder/deleteItem/${encodingPath}?folderName=${FOLDER_NAME}`)
        console.log('reponse delation is :',reponse.data)
        setUpdateFileFolder(prev=>prev+1)
    }
   /* if(musicTab?.message){
        return <div><p>{musicTab.message}</p></div>
    }*/
    const deleteIsDone = ()=>{
        setAppearStact(false)
    }
    return (
        <Container maxWidth="lg">
            <div>
                {/*put the link of the return here */}
                <NavigationDiv>
                    <Link to={"/"} style={{color:"black"}}>
                        <ReplyIcon/>
                    </Link>
                </NavigationDiv>
            </div>
            <div>
                <List dense	 sx={{
                    width: '100%',
                    position: 'relative',
                    overflow: 'auto',
                    maxWidth: 800,
                    bgcolor: 'background.paper',
                    maxHeight: 735,
                    margin:"auto !important"
                }} component={"nav"}>
                    {
                        musicTab?.message ? (
                            <div>
                                <Typography variant={"h5"} align={"center"}>{musicTab.message}</Typography>
                            </div>
                        ):(
                            Array.isArray(musicTab?.files) && musicTab?.files.map((item:string,index:number)=>(
                            <div key={index}>
                                <ListItem
                                    button
                                    divider
                                    secondaryAction={
                                        <div onClick={()=>handleDelete(item)}>
                                            <DeleteForeverOutlinedIcon/>
                                        </div>
                                    }
                                >
                                    <ListItemText sx={{overflowWrap:'anywhere'}} primary={item}/>
                                </ListItem>
                                <Divider light/>
                            </div>
                        )))
                    }
                </List>
                <div>
                    {/*Snackbar c'est le message d'erreur losque input est vide*/}

                    <Snackbar open={appearStact} autoHideDuration={2000} onClose={deleteIsDone}>
                        <Alert onClose={deleteIsDone} severity={"success"} sx={{width:'100%'}}>
                            THE ITEM HAS BEEN DELETED
                        </Alert>
                    </Snackbar>

                </div>
            </div>
        </Container>
    );
}

export default Music;