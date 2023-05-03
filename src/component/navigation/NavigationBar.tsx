import React, {useRef, useState} from 'react';
import Logo from '../../assets/images/logo-color.png'
import {Avatar, Typography} from "@mui/material";
import {InputCustom, Nav} from "./ui";
import SearchIcon from '@mui/icons-material/Search';
import {BottomItem2} from "../HomeContent/ui";
import SendIcon from '@mui/icons-material/Send';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
function NavigationBar() {

    return (
        <Nav>
            <div>
                <img src={Logo} alt="logo" width={50} height={50}/>
                <Typography variant={"h5"}>Me&Mu</Typography>
            </div>
            {/* Ajouter un truc ici*/}
        </Nav>
    );
}

export default NavigationBar;