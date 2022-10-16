import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
//this constant is used to reset the frontend value after the update Action have been successfully fired on, so it refreshes the frontend before it renders it
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyPost } from "../actions/postActions";
import { LinkContainer } from "react-router-bootstrap";
import Trending from '../components/Trending'
import UserPost from '../components/UserPost'

function ProfileScreen() {
  const history = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const postListMy = useSelector((state) => state.postListMy);
  const { error:errorPostList, loading:loadingPostList, success:successPostList, myposts } = postListMy;

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }
    else 
        {      
        if (!user || !user.name || success || userInfo._id !== user._id) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(getUserDetails("profile"));
            dispatch(listMyPost());
        }
        else {
            dispatch(listMyPost());
            setName(user.name);
            setEmail(user.email);
        }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <div>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Enter Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="passwordConfrim">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confrim Password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <div className="btn-login">
                <Button type="submit" variant="primary">
                Update
                </Button>
            </div>
            
          </Form>
          <hr/>
        </Col>
        
        <Col md={9}>
         
          <h2>My Posts</h2>
            <br/>
          {loadingPostList ? (
            <Loader />
          ) : errorPostList ? (
            <Message variant="danger">{errorPostList}</Message>
          ) : (
            <div className="row">
                <div className="col-md-8">                            
                    {myposts.length !== 0 ? (
                        myposts.map((post) => ( 
                            <UserPost post={post} key={post._id} />                                                        
                        ))
                        ):(
                            <div class="alert alert-success" role="alert">
                                <h4 class="alert-heading"> <i class="fa-solid fa-sync fa-spin"></i> YOU HAVE'NT POSTED ANYTHING YET!</h4>
                            </div>
                        )                     
                    }                                                                           
                </div>
                <div className="col-md-4">
                    <Trending/>
                </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ProfileScreen;
