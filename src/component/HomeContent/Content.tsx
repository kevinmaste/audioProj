import React from 'react';
import {BottomContent, BottomItem2, BottomMeteoContent, ContentBody, MeteoContent} from "./ui";
import {Typography} from "@mui/material";
import NearMeIcon from '@mui/icons-material/NearMe';
import SearchIcon from '@mui/icons-material/Search';
import Sound from "../Audio/Sound";
// @ts-ignore
import piste_1 from '../../assets/musique/song-2.mp3'
function Content() {
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
                        <Sound audio={piste_1}/>
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