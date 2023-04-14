import React from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {Form, LoginContainer, LogoContainer} from './ui'
import Logo from "../../assets/images/logo-color.png"
function Login() {
    return (
        <LoginContainer>
            <LogoContainer>
                <img src={Logo} alt="logo" width={70} height={70}/>
            </LogoContainer>
            <div>
                <Typography variant={"h5"}>
                    Hey, Hello 👋
                </Typography>
                <p>Enter the information you entered while registering</p>
            </div>
            <Typography variant={"h3"} >
                Login
            </Typography>
            <Form action="">
                <TextField type={"text"} variant={"outlined"} label={"Email"} id={'outlined-basic'}/>
                <TextField type={"password"} variant={"outlined"} label={"Password"} id={'outlined-basic'} />
                <Button variant={"contained"}>Login</Button>
            </Form>
        </LoginContainer>
    );
}

export default Login;