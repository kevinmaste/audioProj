import React from 'react';
import Layout from "../../component/Layout";
import NavigationBar from "../../component/navigation/NavigationBar";
import Content from "../../component/HomeContent/Content";
function Home() {
    return (
        <>
            <Layout>
                <NavigationBar/>
                <div>
                    <Content/>
                </div>

            </Layout>
      </>
    );
}

export default Home;