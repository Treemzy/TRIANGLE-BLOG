import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ListGroup, Card, Col,Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Reactions from '../components/Reactions'

function UserPost({ post }) {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    let numLikes = (0);
    let useLike;
    {userInfo ? (
        post.likes.map((like) => {                                               
            return(
                <span key={like._id}>
                    {useLike = like.user == userInfo._id} 
                    {like.user == userInfo._id ? (numLikes = 1) : (numLikes)}                                                                  
                </span>               
            )
        }) 
    ):(
        <spa></spa>
    )}


    return (
        <div>             
            <div className="">
                <Card className="my-3 p-3 rounded">
                    <Row>
                        <Col key={post._id} sm={12} md={6} lg={4} xl={4}>
                            <Link to={`/post/${post._id}`}>
                                <Card.Img src={post.image} />
                            </Link>
                        </Col>
                        <Col  sm={12} md={6} lg={8} xl={8}>
                            <Card.Body>
                                <Link to={`/post/${post._id}`}>
                                    <Card.Title as="div" className="postTitle">
                                        <strong>{post.title}</strong>
                                    </Card.Title>
                                </Link>
                                <Card.Text as="p">
                                    <div className="my-3">
                                    {post.description.substring(0,200)} {post.description.length >= 20 && <Link to={`/post/${post._id}`}>...Read More...</Link> } 
                                    </div>
                                </Card.Text>
                                <Card.Text as="div" className="category">
                                    <button className="btn btn-outline-dark btn-sm mt-1 mb-1">
                                         {post.categories}
                                         
                                        
                                         {/* {post.comments.map((comment) => (                      
                                            <p key={comment._id}>{comment._id}</p>                                                        
                                        ))}  */}
                                        
                                    </button>                                   
                                </Card.Text>
                                <hr/>
                                <div className="row">
                                    <div className="col-md-6">
                                           
                                        <Reactions value={numLikes} likes={post.likes.length} comment={post.comments.length} post={post._id} user={post.user} />
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <p className="text-muted">
                                             <i className="fas fa-clock" style={{ color:'#cc6600' }}></i>                                        
                                             {post.createdAt.substring(0,10)}
                                             ({moment(post.createdAt).fromNow()})
                                             
                                        </p>                                        
                                    </div>
                                </div>
                            </Card.Body>  
                        </Col>     
                    </Row>                                 
                </Card>                   
            </div>            
        </div>
    )
}

export default UserPost
