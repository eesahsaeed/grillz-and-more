
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {BsHandbag} from "react-icons/bs";
import {IconContext} from "react-icons";
import logo from "../assets/logo.png";

export default function Header({theme, changeTheme}){
  //#ea5b30
  //#f07727
  let themeSelector = theme === "dark" ? "bg-light" : "bg-dark";
  let textColor = theme === "dark" ? "text-light" : "text-dark";

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg={theme} variant={theme}>
        <Container fluid={true}>
        <Navbar.Brand href="#home"><img src={logo} width={100}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="me-auto justify-content-end">
            <NavLink to={"/"} className={({isActive}) => isActive ? "nav-link me-3 active-link" : "nav-link me-3"}>Home</NavLink>
            <NavLink to={"/about-us"} className={({isActive}) => isActive ? "nav-link me-3 active-link" : "nav-link me-3"}>About Us</NavLink>
            <NavLink to={"/menu"} className={({isActive}) => isActive ? "nav-link me-3 active-link" : "nav-link me-3"}>Menu</NavLink>
            <NavLink to={"/gallery"} className={({isActive}) => isActive ? "nav-link me-3 active-link" : "nav-link me-3"}>Gallery</NavLink>
            <NavLink to={"/contact"} className={({isActive}) => isActive ? "nav-link me-3 active-link" : "nav-link me-3"}>Contact</NavLink>
          </Nav>
          <Nav>
            <NavLink to={"/cart"} style={{position: "relative"}}>
              <IconContext.Provider value={{className: textColor, size: 25}}>
                <BsHandbag/>
              </IconContext.Provider>
              <div className="cart-notification"></div>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={`theme-selector ${themeSelector}`} onClick={() => {
        switch (theme){
          case "dark": 
            changeTheme("light");
            break;
          case "light":
            changeTheme("dark");
            break;
        }
      }}>

      </div>
    </div>
  )
}
