import React,{useEffect,useState} from 'react';
import {BottomContent, BottomItem2, BottomMeteoContent, ContentBody, MeteoContent} from "./ui";
import {Typography} from "@mui/material";
import NearMeIcon from '@mui/icons-material/NearMe';
import SearchIcon from '@mui/icons-material/Search';
import Sound from "../Audio/Sound";
// @ts-ignore
import {updateMusiquePromise} from "../Audio/utils";


interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}
function Content() {

    //console.log('access token is',accessToken)
    return (
        <ContentBody>
            <MeteoContent>

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
            </BottomMeteoContent>
        </ContentBody>
    );
}

export default Content;