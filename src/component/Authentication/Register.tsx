import React, {ChangeEvent, useState} from 'react';
import {Button, MenuItem, TextField, Typography} from "@mui/material";
import {Form} from './ui'
import {selectMusicItem} from "./AuthUtils";
function Register() {

    const [item,setItem]=useState<string>('pop')

    //debug
    console.log("infos de select Menu :",selectMusicItem[0])
    const handleOnchange =(event:ChangeEvent<HTMLInputElement>):void=>{
        setItem(event.target.value)
    }
    return (
        <div>
            <Typography variant={"h1"} component={"h3"}>
                Register
            </Typography>
            <Form action="">
                <TextField id={"outlined-basic-1"} label={"Name"} type="text" variant={"outlined"}/>
                <TextField id={"outlined-basic-2"} label={"email"} type={"email"} variant={"outlined"}/>
                <TextField id={"outlined-basic-3"} label={"password"} type={"password"} variant={"outlined"}/>
                <TextField id={"outlined-basic-4"} label={"confirm password"} type={"password"} variant={"outlined"}/>
                <div>
                    <TextField
                        select
                        label={"Select"}
                        value={item}
                        onChange={handleOnchange}
                        helperText={"Select your style of music"}
                    >
                        {
                            selectMusicItem.map((select)=>(
                                <MenuItem key={select.value} value={select.value}>
                                    {select.label}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </div>
                <Button variant={"contained"} >Send</Button>
            </Form>
        </div>
    );
}

export default Register;

//-----css

