
import React from "react";
import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

import authHelper from "../helper/auth-helper";
console.log(authHelper.isAuthenticated());

export default function Header(){
  return (
    <Navbar>
      <Container>
        <Navbar.Brand className="text-light" style={{border: "1px solid white", padding: "2px 10px"}}>TRIGAN</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {authHelper.isAuthenticated() ? <>
            <Navbar.Text className="text-warning me-2">
            <Link to="dashboard" className="text-warning nav-text">Dashboard</Link> 
          </Navbar.Text>
          <Navbar.Text className="text-warning me-2">
            /
          </Navbar.Text>
          <Navbar.Text style={{cursor: "pointer"}} onClick={(e) => {
              e.preventDefault();
              authHelper.clearUser(() => {
                window.location.reload()
              });
            }} className="text-warning nav-text">Log Out
          </Navbar.Text>
          </> : <>
          <Navbar.Text className="text-warning me-2">
            <Link to="sign-in" className="text-warning nav-text">Sign In</Link> 
          </Navbar.Text>
          <Navbar.Text className="text-warning me-2">
            /
          </Navbar.Text>
          <Navbar.Text>
            <Link to="sign-up" className="text-warning nav-text">Sign up</Link>
          </Navbar.Text>
          </>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
