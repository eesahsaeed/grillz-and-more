
import React from "react";
import {Container, Col, Row} from "react-bootstrap";
import {BsFillPatchCheckFill, BsCloudUpload} from "react-icons/bs";
import Header from "./Header";

export default function Home(){
  return (
    <Container className="text-light">
      <Header/>
      <Row className="text-center mt-5">
        <h1>Your fundraising deck link.</h1>
      </Row>
      <Row className="text-center mx-auto mt-3 row-aug">
        <Col xs={12} md={4}>
          <BsFillPatchCheckFill size={25} style={{color: "hsl(45 100% 27% / 1)"}}/> <span style={{fontSize: 25, verticalAlign: -5, color: "hsl(45 100% 27% / 1)"}}>Private to you</span>
        </Col>
        <Col xs={12} md={5}>
          <BsFillPatchCheckFill size={25} style={{color: "hsl(45 100% 27% / 1)"}}/> <span style={{fontSize: 25, verticalAlign: -5, color: "hsl(45 100% 27% / 1)"}}>Track investor activity</span>
        </Col>
        <Col xs={12} md={3}>
          <BsFillPatchCheckFill size={25} style={{color: "hsl(45 100% 27% / 1)"}}/> <span style={{fontSize: 25, verticalAlign: -5, color: "hsl(45 100% 27% / 1)"}}>Always free</span>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <input type="file" id="file"/>
        <div className="fancyFile">
          <label className="fancyButton bg-warning text-dark py-2" htmlFor="file">
            <BsCloudUpload size={20}/> Upload a PDF File
          </label>
        </div>
      </Row>
      <Row style={{marginTop: "10rem"}}>
        <h2 className="text-center">Use Trigon.com when you want to meet with the best.</h2>
      </Row>
    </Container>
  )
}
