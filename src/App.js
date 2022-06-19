
import React, {useState} from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import PdfView from "./components/PdfView";

if (!sessionStorage.getItem("fetch")){
  sessionStorage.setItem("fetch", JSON.stringify({fetch: true}));
  fetch("https://trigan.herokuapp.com/users/demo", {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  }).then(rs => {
    let d = rs.json();
    console.log(d);
  });
}

export default function App(){

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/v/:id" element={<PdfView/>} />
      </Routes>
    </HashRouter>
  )
}
