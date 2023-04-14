import React from 'react';
import {Grid, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Login from "../../component/Authentication/Login";
import {Background, BackgroundContent, Global, LoginBackground} from "./ui";
function HomePage() {
    return (
        <Global>
            <Grid container>
                <Grid item xs={6}>
                    <Background>
                        <BackgroundContent>
                            <PlayArrowIcon color={"action"} fontSize={"large"}/>
                            <Typography variant={"h3"} >
                                Just come and vibe platform
                            </Typography>
                            <Typography variant={"h4"}>
                                Music.
                            </Typography>
                            <p>
                                You will know everything.
                            </p>
                            <p>Subscribe.</p>
                        </BackgroundContent>
                    </Background>
                </Grid>
                <Grid item xs={6}>
                    <LoginBackground>
                        <Login/>
                    </LoginBackground>
                </Grid>
            </Grid>
        </Global>
    );
}

export default HomePage;