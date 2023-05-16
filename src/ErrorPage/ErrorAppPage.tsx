import React from 'react';
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ContainerLinkModifier, LinkModifier} from "./ui";

function ErrorAppPage() {
    return (
        <div>
            <Typography variant={"h4"} align={"center"}>
                An Error 404 occur 😶
            </Typography>
            <ContainerLinkModifier >
                <LinkModifier to={'/'} >Back</LinkModifier>
            </ContainerLinkModifier>
        </div>
    );
}

export default ErrorAppPage;