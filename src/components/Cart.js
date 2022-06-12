
import React from "react";

import Header from "./Header";

export default function Cart({theme, changeTheme}){
  return (
    <div>
      <Header theme={theme} changeTheme={changeTheme}/>
      This is Cart
    </div>
  )
}
