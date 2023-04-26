import React, {useRef, useState} from 'react';
import Logo from '../../assets/images/logo-color.png'
import {Avatar, Typography} from "@mui/material";
import {InputCustom, Nav} from "./ui";
import SearchIcon from '@mui/icons-material/Search';
import {BottomItem2} from "../HomeContent/ui";
import SendIcon from '@mui/icons-material/Send';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
function NavigationBar() {

    const [open ,setOpen]=useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const handleButtonSend=()=>{
        console.log('i send my request')
        console.log('envoi : ',inputRef.current?.value)
        setOpen(false)
    }

    const handleButtonOpen =()=>{
        console.log('the input is open')
        setOpen(true)
    }

    return (
        <Nav>
            <div>
                <img src={Logo} alt="logo" width={50} height={50}/>
                <Typography variant={"h5"}>Me&Mu</Typography>
            </div>
            <BottomItem2>
                <div>
                    <InputCustom ref={inputRef} type="text" open={open}/>
                    {
                        open ? (
                            <div className="change" onClick={handleButtonSend}>
                                <DoubleArrowIcon  />
                            </div>
                        ):(
                            <div className="change" onClick={handleButtonOpen}>
                                <SearchIcon  />
                            </div>
                        )
                    }
                </div>
            </BottomItem2>
        </Nav>
    );
}

export default NavigationBar;