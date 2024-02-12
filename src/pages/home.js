import React from 'react';
import Header from "../master/header";
import SearchHeader from "../master/search-header";
import SectionMain from "../master/section-main";

const Home = () => {
    const [buttons, setButtons] = React.useState(['all']);

    const getButtons=(id)=>{
        setButtons(id)
    }

    return (
        <>
            <Header/>

            <main role="main" className="app-content">
                <SearchHeader buttons={getButtons} />
                <SectionMain buttons={buttons} />
            </main>

        </>
    );
};

export default Home;