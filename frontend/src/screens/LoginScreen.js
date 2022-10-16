import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginScreen() {
    const history = useNavigate();
    const location = useLocation();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
  
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;
  
    useEffect(() => {
      if (userInfo) {
        history(redirect);
      }
    }, [history, userInfo, redirect]);
  
    const submitHandler = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
    
        setValidated(true);
            e.preventDefault();
            dispatch(login(email, password));
    };


    return (
        
        <FormContainer>
            <ToastContainer />
            <h1 className="text-center">Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form noValidate validated={validated} onSubmit={submitHandler}>
                <Form.Group controlId="email">
                     <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <br />
                <div className="btn-login"> 
                    <Button type="submit" variant="primary">
                        Sign In
                    </Button>
                </div>
               
            </Form>
                <Row className="py-3">
                    <Col>
                    New User ?{" "}
                    <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                        Register
                    </Link>
                    </Col>
                </Row>
        </FormContainer>
    )
}

export default LoginScreen
