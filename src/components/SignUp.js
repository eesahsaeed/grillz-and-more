
import React, {useState} from "react";
import {Container, Row, Col, Button, Form, Spinner, Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {ref, uploadBytes} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore"; 
import {v4} from "uuid";
import {auth, db, storage} from "../firebase";
import {FcGoogle} from "react-icons/fc";
import {BsCloudUpload} from "react-icons/bs";
import {Link} from "react-router-dom";

export default function SignUp(){
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    pdf: null,
    pdfName: ""
  })
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleChange(e){
    let name = e.target.name;
    let value = name === "pdf" ? e.target.files[0] : e.target.value; 

    if (name === "pdf"){
      setValues({...values, [name]: value, pdfName: value.name});  
    } else {
      setValues({...values, [name]: value});
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    let userData = new FormData();
    values.firstName && userData.append("firstName", values.firstName);
    values.lastName && userData.append("lastName", values.lastName);
    values.email && userData.append("email", values.email);
    values.password && userData.append("password", values.password);
    values.pdf && userData.append("pdf", values.pdf);
    values.pdfName && userData.append("pdfName", values.pdfName);

    async function register(user){
      try{
        //https://escrow-block.herokuapp.com/users/register
       let response = await fetch("https://trigan.herokuapp.com/users/register", {
          method: "POST",
          headers: {
          },
          body: user
        })

        return await response.json();
      } catch(err){
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    register(userData).then(data => {  
      if (data.success){
        setLoading(false);
        navigate("/dashboard");
      } else if (data.errors){
        window.scrollTo({
          top: 150,
          behavior: "smooth",
        });
        console.log(data);
        setLoading(false);
        setErrors(data.errors)
        setErrorMessage(data["_message"])
      } else {
        setLoading(false);
        setErrorMessage("Error Occurred")
        setErrors({errors: true})
      }
    }).catch(err => {
      window.scrollTo({
        top: 150,
        behavior: "smooth",
      });
      setLoading(false);
      setErrorMessage("Error Occurred");
      setErrors({errors: true})
    })

    /*try {
      const docRef = await addDoc(collection(db, "users"), values);
      
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }  */ 
  }

  return (
    <Container className="text-light">
      <Row className="text-center container-row" style={{backgroundColor: "hsl(210 11% 20% / 1)", margin: "10px auto"}}>
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
            {errorMessage && (
              <Alert variant={"danger"}>
                {errorMessage}
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="mx-auto mt-3">
          <Col className="mx-auto">
            <Form>
              <Row className="mb-4">
                <Col>
                  <Form.Control style={{backgroundColor: "hsl(210 11% 20% / 1)"}} className="text-light" placeholder="Email" type="email" name="email" onChange={handleChange} required/>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Form.Control style={{backgroundColor: "hsl(210 11% 20% / 1)"}} className="text-light" placeholder="Password" type="password" name="password" onChange={handleChange} required/>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Form.Control style={{backgroundColor: "hsl(210 11% 20% / 1)"}} className="text-light" placeholder="First name" type="text" name="firstName" onChange={handleChange} required/>
                </Col>
                <Col>
                  <Form.Control style={{backgroundColor: "hsl(210 11% 20% / 1)"}} className="text-light" placeholder="Last name" type="text" name="lastName" onChange={handleChange} required/>
                </Col>
              </Row>
              <Row className="mb-4">
                <input type="file" id="file" name="pdf" onChange={handleChange} required/>
                <div className="fancyFile">
                  <label className="fancyButton bg-warning text-dark py-2" htmlFor="file">
                    <BsCloudUpload size={20}/> Upload a PDF File
                  </label>
                </div>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Button style={{backgroundColor: "#f0ad4e", border: "none"}} className="w-100" onClick={handleSubmit} disabled={loading}>
                    {loading ? <Spinner animation="border" variant="dark" /> : <span className="text-dark">Submit</span>}
                  </Button>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  Already have an account <Link to="../sign-in">Log in</Link>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}
