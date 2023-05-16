import React, {ChangeEvent, SyntheticEvent, useEffect, useRef,KeyboardEvent ,useState} from 'react';
import {BottomContent, BottomItem2, BottomMeteoContent, ButtonItem, ContentBody, MeteoContent, NothingDiv} from "./ui";
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
    const [stringForTheUseEffectV2,setStringForTheUseEffect]=useState<string>('')
    //catching the data from the suggestion part
    const [catchData,setCatchData]=useState<string[] >([])

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

    //the useEffect permit to send the data to the server dans print the element.
     useEffect( ()=>{
         console.log('premier useEffect avec le call de api suggestion')
         console.log('-----------SUGGESTION USEEFFECT----------------------')

         if (searchItem !=='') {
             console.log('-------------------------searcItem pas string USEEFFECT----------------------')

             fetch(`http://localhost:8080/api/suggestion/${searchItem}`)
                .then(result => result.json())
                .then(data=>{
                    console.log("la data est : ",data)
                    console.log("la data est de type: ",typeof data)
                    //le separateur
                    //separate(data,searchItem)
                    if (typeof data === "string"){
                        console.log('-------------------------fecth suggestion dans le fetch suggestion----------------------')
                        console.log("i'm here men")
                        setCatchData([]);
                        setStringForTheUseEffect(searchItem)
                    }
                    console.log('-------------------------je suis n est jamais ete dans le if ----------------------')

                    setCatchData(data)
                    setTeste(true)
                })
                .catch(err => {
                    console.log("L'erreur est : ", err)
                })
        }


    },[searchItem])
    console.log('-------------------------catchData debut ----------------------')

    console.log("catch item is : ",catchData)
    console.log("catch item is : ",typeof catchData)
    console.log('-------------------------catchdata fin----------------------')

    //the suggestion can be empty , so if the array in empty this useEffect will automatically use

    //that fonction will permit to handle the situation of the no suggestion
    const handleBackTheNoSug = async ()=>{
        console.log('-------------------------handleBackTheNoSug F debut----------------------')
        console.log("catchData =",catchData.length)
        console.log("Type catchData = ",typeof catchData)
        console.log('-------------------------handleBackTheNoSug F fin----------------------')

        if (typeof catchData ==="string") {
            console.log('-------------------------handleBackTheNoSug fonction here----------------------')
            console.log("je suis dedans");
            console.log('-------------------------handleBackTheNoSug stringForTheUseEffectV2 debut ----------------------')
            console.log('stringForTheUseEffectV2 = ',stringForTheUseEffectV2 || null)

            try {
                const resultat = await axios.get(`http://localhost:8080/api/search/${stringForTheUseEffectV2}`)
                const take_just_the_infos =stringForTheUseEffectV2+' '+resultat?.data.artist?.name;
                const tab_ephemere = []
                tab_ephemere.push(take_just_the_infos )
                setCatchData(tab_ephemere)
                //setTeste(true)
            }catch (e) {
                console.log("erreur est : ",e)
            }
            console.log('-------------------------handleBackTheNoSug fonction work----------------------')


        }

    }
    //cette fonction est aussi run
    useEffect( ()=>{
        console.log('-------------------------handleBackTheNoSug get CALL USEEFFECT----------------------')
        console.log('je run aussi cette parti pour le changement du catchdata')
        //here instead of put searchItem that gonna be stringForTheUseEffectV2
        handleBackTheNoSug()

    },[stringForTheUseEffectV2])

    console.log('teste est : ',teste)

    const handleSearch = async (item:string,separator:string)=>{
        console.log('----------------------------1-------------------')

        console.log("in handleseacrh is :",item)
        console.log('-----------------------------------------------')
        const {songName,artistName} = separate(item,separator);
        console.log('song Name in search methode is :',songName)
        console.log('------------------------------------2-----------')
        console.log('artis name in search methode is :',artistName)


        try {
            const result = await
                axios.get(`http://localhost:8080/api/search/${songName}?artist=${artistName}`)
            console.log('--------------------4---------------------------')
            console.log('the result of the search methode',result)
            setVideoId(result.data['videoId'])
            setvideoInfos({
                artist:result.data['artist']?.name || result.data["album"]?.name || result.data["author"]?.name,
                songName:result.data['name'],
                thumbnails:result.data.thumbnails[0]?.url || result.data.thumbnails?.url
            })
            console.log('resutat of the song is : ',result.data)

        }catch (e) {
            console.log("erreur is ",e)
        }
        console.log('--------------------5--SET MODAL is set-------------------------')
        setModalOpen(true)
        console.log("--------------------------The modal change to true")

    }
    console.log('--------------------5--SET MODAL debut-------------------------')
    console.log("Modal is : ",modalOpen)
    console.log('--------------------5--SET MODAL FIN-------------------------')

    console.log("---------------------------Video infos debut ----------------------------")
    console.log('video infos is :',vidoInfos)
    console.log("---------------------------Video infos fin----------------------------")

    //This function close the modal
    const handleCloseModal = ()=>{
        console.log('-------------je suis dans le handlerClose modal--------')
        setModalOpen(false)
    }

    //This function permit to take the value of the input
    const handleOnchange =(event:ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value
        setValueBlur(value)

    }

    //This function set the value of the input via the onBlur
    const HandleBlur=()=>{
        console.log('the handleblur is calling ')
        setSearchItem(valueBlur)
    }

    //This function permit to control the erreur
    const handleButtonSend=()=>{
        //s'il n'y a rien d'écrit je vais faire apparaitre l'arlert
        if(valueBlur ===''){
            setControlledError(true)
            return;
        }
        setOpen(false)
        setValueBlur('')
    }
    console.log('search element',searchItem)
    const handleButtonOpen =()=>{
        console.log('the input is open')
        setOpen(true)
    }

    const handlePressButton = (e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.key==="Enter"){
            handleButtonSend()
        }
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
                            maxHeight: 230,
                            margin:"auto !important"
                        }} component={"nav"}>
                            {Array.isArray(catchData) && catchData.map((item,index)=>(
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
                        <NothingDiv><span  style={{color:"white",fontSize:"24px",textAlign:"center"}}>Il  n'y a plus des données</span></NothingDiv>
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
                        <InputCustom
                            onChange={handleOnchange}
                            onBlur={HandleBlur}
                            value={valueBlur}
                            onKeyPress={handlePressButton}
                            type="text"
                            open={open}/>
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