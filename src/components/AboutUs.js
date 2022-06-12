
import React from "react";

import Header from "./Header";

export default function AboutUs({theme, changeTheme}){
  return (
    <div>
      <Header theme={theme} changeTheme={changeTheme}/>
      This is About
    </div>
  )
}
