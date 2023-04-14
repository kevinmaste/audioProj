import React, {ReactNode} from 'react';
import {Container, CssBaseline} from "@mui/material";

type Props ={
    children: ReactNode;
}
function Layout({children}:Props){
    return (
        <>
            <CssBaseline/>
            <Container fixed>
                {children}
            </Container>
        </>
    );
}

export default Layout;