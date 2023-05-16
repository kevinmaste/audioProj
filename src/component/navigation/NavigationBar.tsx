import React, {useContext, useRef, useState} from 'react';
import Logo from '../../assets/images/logo-color.png'
import {Avatar, Typography} from "@mui/material";
import {InputCustom, Nav, QueueListMusic} from "./ui";
import SearchIcon from '@mui/icons-material/Search';
import {BottomItem2} from "../HomeContent/ui";
import SendIcon from '@mui/icons-material/Send';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import NotificationsIcon from '@mui/icons-material/Notifications';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Badge from '@mui/material/Badge';
import {BadgeContext} from "../../pages/Home/Home";
import {Link} from "react-router-dom";
function NavigationBar() {
    //c'est le context
    const [badgeNumber ,]=useContext(BadgeContext)

    return (
        <Nav>
            <div>
                <img src={Logo} alt="logo" width={50} height={50}/>
                <Link to={'/'} style={{color:"black",textDecoration:"none"}}>
                    <Typography variant={"h5"}>Me&Mu</Typography>
                </Link>
            </div>
            {/* Ajouter un truc ici*/}
            <div>
                <div>
                    {/*Here we going to put the number of the fille*/}
                    <Badge color="secondary" badgeContent={badgeNumber} showZero={false}>
                        {/*May later we going to change the color of this or the heigth too*/}
                        <Link to={"/music-list"} style={{color:"black"}}>
                            <QueueListMusic/>
                        </Link>
                    </Badge>
                </div>
            </div>
        </Nav>
    );
}

export default NavigationBar;