import React, {createContext, useEffect, useState} from 'react';
// eslint-disable-next-line
import Register from "./component/Authentication/Register";
// eslint-disable-next-line
import Layout from "./component/Layout";
// eslint-disable-next-line
import HomePage from "./pages/Homepage/HomePage";
import Home from "./pages/Home/Home";
import axios from "axios";
import Music from "./component/MusicObject/Music";
import {Outlet, Route, Routes} from "react-router-dom";
import ErrorAppPage from "./ErrorPage/ErrorAppPage";
import Content from "./component/HomeContent/Content";



export const MusicGetContext = createContext<string[] | any>(undefined)
function App() {

    const [musicTab ,setMusicTab]=useState<string[]>([])

    const FOLDER_NAME = process.env.REACT_APP_FOLDER_NAME;
    console.log("folder name is :",FOLDER_NAME)
    useEffect(()=>{
         const createFolder = async()=>{
           try {
               const create = await axios.post(`http://localhost:8080/folder/createFolder/${FOLDER_NAME}`)
               console.log(create.data)
           }catch (e) {
            console.log("error :",e)
           }
        }
        createFolder();

    },[FOLDER_NAME])

    //c'est dans cette fonction qu'on va mettre le router
  return (
    <>
        <MusicGetContext.Provider value={[musicTab,setMusicTab]}>
            <Routes>
                <Route path={"/"} element={<Home/>}>
                        <Route path={"/"} element={<Content/>} index={true}/>
                        <Route path={"music-list"} element={<Music/>}/>
                        <Route path={'*'} element={<ErrorAppPage/>}/>
                </Route>
            </Routes>
        </MusicGetContext.Provider>
    </>
  );
}

export default App;







