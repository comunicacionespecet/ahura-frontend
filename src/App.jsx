import React from 'react';
import Header from './components/organisms/Header';
import SubHeader from './components/organisms/SubHeader';
import MainFeatures from './components/organisms/MainFeatures';
import AboutSection from './components/organisms/AboutSection';
import Footer from './components/organisms/Footer';

function App() {
    return (
        <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden">
            <Header></Header>
            <SubHeader></SubHeader>
            <MainFeatures></MainFeatures>
            <AboutSection></AboutSection>
            <Footer></Footer>
        </div>
    );
}

export default App;
