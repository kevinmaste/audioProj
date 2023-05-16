import React, {createContext, useState} from 'react';
import Layout from "../../component/Layout";
import NavigationBar from "../../component/navigation/NavigationBar";
import Content from "../../component/HomeContent/Content";
import {Outlet} from "react-router-dom";

export const BadgeContext = createContext<[number, (badgeNumber:number)=>void]>(
    [0,
        ()=>{}
    ]);

export const FolderHeight = createContext<number | any>(undefined)

function Home() {
    const [badgeNumber,setBadgeNumber]=useState<number>(0)
    const [lengthFolder,setLengthFolder]=useState<number>(0)
    return (
        <>
            <BadgeContext.Provider value={[badgeNumber,setBadgeNumber]}>
                <FolderHeight.Provider value={[lengthFolder,setLengthFolder]}>
                    <Layout>
                        <NavigationBar/>
                        <div>
                            <Outlet/>
                            {/*<Content/>*/}
                        </div>
                    </Layout>
                </FolderHeight.Provider>
            </BadgeContext.Provider>

      </>
    );
}

export default Home;