import React, {ChangeEvent, SyntheticEvent, useEffect, useRef, useState} from 'react';
import {BottomContent, BottomItem2, BottomMeteoContent, ButtonItem, ContentBody, MeteoContent} from "./ui";
import {Divider, List, ListItem, ListItemText, Snackbar, Typography} from "@mui/material";
import NearMeIcon from '@mui/icons-material/NearMe';
import SearchIcon from '@mui/icons-material/Search';
import Sound from "../Audio/Sound";
// @ts-ignore
import {updateMusiquePromise} from "../Audio/utils";
import {InputCustom} from "../navigation/ui";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import background from "../../assets/images/background-3.jpg"
import {Alert} from "../Alert/Alert";
import MuiAlert from "@mui/material/Alert";
import {separate} from "./filter";
import axios from "axios";
import ModalPop from "../Modal/ModalPop";

//interface of the video infos
interface VideoInfo {
    artist: string;
    songName: string;
    thumbnails: string;
}
function Content() {
    const [open ,setOpen]=useState<boolean>(false)
    const [controlledError,setControlledError]=useState<boolean>(false)
    const [searchItem,setSearchItem]=useState<string>('')
    const [valueBlur,setValueBlur] = useState<string>('')
    const [catchData,setCatchData]=useState<string[]>([])
    const [modalOpen,setModalOpen]=useState<boolean>(false)

    //we going to pass that to the modal for the managing of the download
    const [videoId,setVideoId]=useState<string>('')
    const [vidoInfos,setvideoInfos]=useState<VideoInfo>(
        {
            artist:'',
            songName:"",
            thumbnails:""
        })
    //useRef c'est bien, mais je veux update la valeur
    //const inputRef = useRef<HTMLInputElement>(null)

    const [teste, setTeste]=useState<boolean>(false)

     useEffect( ()=>{

        if (searchItem !=='') {
            fetch(`http://localhost:8080/api/suggestion/${searchItem}`)
                .then(result => result.json())
                .then(data=>{
                    console.log("la data est : ",data)
                    //le separateur
                    //separate(data,searchItem)
                    setCatchData(data)
                    setTeste(true)
                })
                .catch(err => {
                    console.log("L'erreur est : ", err)
                })
        }


    },[searchItem])

    console.log('teste est : ',teste)

    const handleSearch = async (item:string,separator:string)=>{
        console.log("in handleseacrh is :",item)
       const {songName,artistName} = separate(item,separator);

        try {
            const result = await
                axios.get(`http://localhost:8080/api/search/${songName}?artist=${artistName}`)

            setVideoId(result.data['videoId'])
            setvideoInfos({
                artist:result.data['artist'].name || result.data["album"].name,
                songName:result.data['name'],
                thumbnails:result.data.thumbnails[1].url
            })
            console.log('resutat of the song is : ',result.data)

        }catch (e) {
            console.log("erreur is ",e)
        }
        setModalOpen(true)
    }

    //This function close the modal
    const handleCloseModal = ()=>{
        setModalOpen(false)
    }

    //This function permit to take the value of the input
    const handleOnchange =(event:ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value
        setValueBlur(value)

    }

    //This function set the value of the input via the onBlur
    const HandleBlur=()=>{
        setSearchItem(valueBlur)
    }

    //This function permit to control the erreur
    const handleButtonSend=()=>{
        //s'il n'y a rien d'écrit je vais faire apparaitre l'arlert
        if(valueBlur ===''){
            setControlledError(true)
        }
        setOpen(false)
        setValueBlur('')
    }
    console.log('search element',searchItem)
    const handleButtonOpen =()=>{
        console.log('the input is open')
        setOpen(true)
    }


    const handleCloseError = (event?:SyntheticEvent | Event,reason?:string)=>{
        if (reason==='clickaway'){
            return;
        }
        setControlledError(false)
    }
    //console.log('access token is',accessToken)
    return (
        <ContentBody>
            <MeteoContent url={background}>
                {teste ?
                    <div>
                        <List sx={{
                            width: '100%',
                            position: 'relative',
                            overflow: 'auto',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                            maxHeight: 350,
                            margin:"auto !important"
                        }} component={"nav"}>
                            {catchData?.map((item,index)=>(
                               <div key={item+`${index}`}>
                                   <ListItem button  divider onClick={()=>handleSearch(item,searchItem)}>
                                       <ListItemText primary={item}/>
                                   </ListItem>
                                   <Divider light/>
                               </div>
                            )) }
                        </List>
                    </div>
                    :
                    (
                        <div><span  style={{color:"white",fontSize:"24px"}}>Il  n'y a plus des données</span></div>
                    )
                }
            </MeteoContent>
            <BottomMeteoContent>
                <BottomContent>
                    <div>
                        {/* testing wavesurfer element*/}
                        {/*<NearMeIcon/>
                            <span>My location</span>*/}
                        {/*<Sound audio={"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}/>*/}
                        <Sound audio={updateMusiquePromise}/>
                    </div>
                    {/*On met tout en pause pour cette partie pour avoir la place pour la musique*/}
                    {/*<BottomItem2>
                        <div>
                            <SearchIcon/>
                        </div>
                        {/*<span>Research weather</span>}
                    </BottomItem2>*/}

                </BottomContent>
                <BottomItem2>
                    <div>
                        {/*voir comment se passe les form dans react */}
                        <InputCustom onChange={handleOnchange} onBlur={HandleBlur} value={valueBlur} type="text" open={open}/>
                        {
                            open ? (
                                <ButtonItem className="change" onClick={handleButtonSend}>
                                    <DoubleArrowIcon  />
                                </ButtonItem>
                            ):(
                                <ButtonItem className="change1" onClick={handleButtonOpen}>
                                    <SearchIcon  />
                                </ButtonItem>
                            )
                        }
                        {/*Snackbar c'est le message d'erreur losque input est vide*/}

                        <Snackbar open={controlledError} autoHideDuration={1000} onClose={handleCloseError}>
                            <Alert onClose={handleCloseError} severity={"warning"} sx={{width:'100%'}}>
                                Put something
                            </Alert>
                        </Snackbar>
                    </div>
                </BottomItem2>
            </BottomMeteoContent>
            {/*ModalPop c'est pour que l'utilisateur soit bien sur que c'est ce qu'il veut*/}
            <ModalPop open={modalOpen} handleClose={handleCloseModal} infos={vidoInfos} videoId={videoId}/>
        </ContentBody>
    );
}

export default Content;