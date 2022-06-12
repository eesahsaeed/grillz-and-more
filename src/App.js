
import React, {useState} from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import AboutUs from "./components/AboutUs";

export default function App(){
  
  const [theme, setTheme] = useState("dark");

  function changeTheme(name){
    let rootElem = document.documentElement;
    rootElem.setAttribute("class", "bg-" + name);
    let rootEl = document.getElementById("root");
    rootEl.setAttribute("class", "bg-" + name);
    setTheme(name);
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home theme={theme} changeTheme={changeTheme}/>} />
        <Route path="/about-us" element={<AboutUs theme={theme} changeTheme={changeTheme}/>} />
      </Routes>
    </HashRouter>
  )
}
