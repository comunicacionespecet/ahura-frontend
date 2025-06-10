import React from "react";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import MainFeatures from "./components/MainFeatures";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

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
