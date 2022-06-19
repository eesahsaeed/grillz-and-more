
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Row, Col, Button, Form, Spinner, Alert} from "react-bootstrap";
import {FcGoogle} from "react-icons/fc";

export default function SignUp(){
  const [values, setValues] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = name => event => {
    let value = event.target.value;
    setValues({...values, [name]: value});
  }

  function handleClick(event){
    event.preventDefault();
    
    async function signIn(data){
      let user = await fetch("https://trigan.herokuapp.com/users/signin", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      return await user.json();
    }

    signIn(values).then(user => {
      if (user.error){
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setError(user)
        console.log(user);
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      }
    }).catch(err => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    })
  }

  return (
    <Container className="text-light">
      <Row className="text-center container-row container-signin" style={{backgroundColor: "hsl(210 11% 20% / 1)", margin: "50px auto"}}>
        <Row className="mt-5">
          <h2>TRIGAN</h2>
        </Row>
        <Row className="mx-auto mt-5">
          <Col className="mx-auto">
            <Button className="bg-light w-100 text-dark btn-secondary"><FcGoogle size={30}/> Sign In With Google</Button>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col xs={5}>
            <hr className="bg-light"/>
          </Col>
          <Col xs={2}>
            OR
          </Col>
          <Col xs={5}>
            <hr className="bg-light"/>
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col>
            {error.error && (
              <Alert variant={"danger"}>
                {error.error}
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col className="mx-auto">
            <Form>
              <Row className="mb-4">
                <Col>
                  <Form.Control style={{backgroundColor: "hsl(210 11% 20% / 1)"}} className="text-light" placeholder="Email" type="email"onChange={handleChange("email")}/>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Form.Control style={{backgroundColor: "hsl(210 11% 20% / 1)"}} className="text-light" placeholder="Password" type="password" onChange={handleChange("password")}/>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                <Button style={{backgroundColor: "#f0ad4e", border: "none"}} className="w-100" onClick={handleClick} disabled={loading}>
                    {loading ? <Spinner animation="border" variant="dark" /> : <span className="text-dark">Log in</span>}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}
