import React from 'react';
import Logo from '../../assets/images/logo-color.png'
import {Avatar, Typography} from "@mui/material";
import {Nav} from "./ui";
function NavigationBar() {
    return (
        <Nav>
            <div>
                <img src={Logo} alt="logo" width={50} height={50}/>
                <Typography variant={"h5"}>Me&Mu</Typography>
            </div>
            <div>
                <div>
                    <Avatar>UB</Avatar>
                </div>
            </div>
        </Nav>
    );
}

export default NavigationBar;