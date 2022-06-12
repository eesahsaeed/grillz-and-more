
import React from "react";

import burger from "../assets/burger.jpg";

import Header from "./Header";
import {Container, Image, Col, Row} from "react-bootstrap";

export default function Home({theme, changeTheme}){

  let textColor = theme === "dark" ? "text-light" : "text-dark";
  let bgColor = theme === "dark" ? "bg-dark" : "bg-light";

  return (
    <div>
      <Header theme={theme} changeTheme={changeTheme}/>
      <Container className={bgColor}>
        <Row>
          <Col xs={{order: 2, span: 12}} md={{order: 1, span: 7}} className="slogan-text">
            <h1 className={textColor}>Make an order right now. Fast and Tasteful.</h1>
            <button className="fancy-button">Make Order</button>
          </Col>
          <Col xs={{order: 1, span: 12}} md={{order: 2, span: 5}}>
            <Image src={burger} fluid={true} className="image"/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
