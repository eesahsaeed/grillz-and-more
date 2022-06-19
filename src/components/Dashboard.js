
import React, {useState, useEffect} from "react";
import {Container, Navbar, Row, Card, Col, Badge, Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {MdInsertLink, MdOutlineLaunch, MdEdit} from "react-icons/md";
import authHelper from "../helper/auth-helper";
import {Switch} from "pretty-checkbox-react";

import '@djthoms/pretty-checkbox';

const origin = window.location.origin + "/#/" + "v/";

export default function Dashboard(){
  const navigate = useNavigate();
  const [user, setUser] = useState(authHelper.isAuthenticated());
  const [pdfs, setPdfs] = useState([]);
  
  useEffect(() => {
    async function getInfo(){
      if (user){
        try{
          let response = await fetch("https://trigan.herokuapp.com/users/userPdfs", {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Authorization": user.token
            }
          })

          return await response.json(); 
        } catch(err){
          console.log(err);
        }
      } else {
        navigate("/sign-in");
      }
    }

    let t = getInfo();
    t.then(d => {
      console.log(d);
      setPdfs(d);
    })
  }, [])

  function getLink(pdfId){
    pdfId = origin + pdfId;
    let tempLink = pdfId.substring(0, 26) + "...";
    return tempLink;
  }

  function copyLink(id){
    return function(e){
      navigator.clipboard.writeText(origin + id);
    }
  }

  return (
    <Container>
      <Navbar>
        <Container>
        <Navbar.Brand className="text-light" style={{border: "1px solid white", padding: "2px 10px"}}>TRIGAN</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="text-light">
              Signed in as: {user.firstName}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="text-light my-3">
        <Row>
          <h1>My Briefs</h1>
        </Row>
        {pdfs.map((p, i) => (
          <Row key={i}>
            <Card className="bg-dark border-light">
              <Card.Header className="border-light">{p.name}</Card.Header>
              <Card.Body>
                <Row className="text-center">
                  <Col xs={12} md={4}>
                    <div className="card-link">
                      <span style={{verticalAlign: "-2px"}}>{getLink(p.pdfId)}</span> {' '}
                      <Badge pill bg="warning" text="dark" className="text-right copy-link" onClick={copyLink(p.pdfId)}>
                        <MdInsertLink size={20}/> Copy Link
                      </Badge>
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <span className="me-2">Active Link</span> {' '} <Switch shape="fill"></Switch>
                  </Col>
                  <Col xs={12} md={4}>
                    <Button className="card-btn" onClick={() => {
                      navigate("/v/" + p.pdfId)
                    }}>Preview <MdOutlineLaunch/></Button>
                    <Button className="card-btn">Edit Brief <MdEdit size={15} style={{verticalAlign: "-1px"}}/></Button>
                    <Button className="card-btn" style={{position: "relative"}}><span style={{position: "relative", bottom: 4}}>...</span></Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        ))}
      </Container>
    </Container>
  )
}
