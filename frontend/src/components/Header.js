import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap"
import { Link } from 'react-router-dom';
import { logout } from "../actions/userActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import SearchBox from './SearchBox'
import {Helmet} from "react-helmet";

function Header() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const history = useNavigate();

    const dispatch = useDispatch();
  
    const logoutHandler = () => {
      dispatch(logout());
      history("/login");
    };

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>TRIANGLE</title>
                <link rel="canonical" href="" />
            </Helmet>
           <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"> <FontAwesomeIcon icon={faAngleUp}/> Triangle</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active" aria-current="page" >Home</Link>                               
                            </li>
                            <li className="nav-item">
                                <Link to="/FAQ" className="nav-link" >FAQ</Link>                               
                            </li>
                            
                        </ul>
                        
                        <div className="d-flex" > 
                                              
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {userInfo && (
                                <LinkContainer to="/createpost">
                                    <Nav.Link>
                                        <i className="fas fa-plus"></i> Create Post
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo ? (
                                
                                    <NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}>
                                             Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                
                                
                                ) : (
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <i className="fas fa-sign-in"></i> Login
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>SignUp For Free</Nav.Link>
                                    </LinkContainer>
                                </>
                                )}
                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title="Admin" id="adminMenu">
                                        <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to="/admin/postlist">
                                        <NavDropdown.Item>Posts</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/category">
                                            <NavDropdown.Item>Category</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/comments">
                                            <NavDropdown.Item>Comments</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
