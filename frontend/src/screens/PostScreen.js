import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Card,
    Form,
  } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Trending from '../components/Trending';
import { listPostDetails, createPostComment, deletePostComment } from "../actions/postActions";
import Reactions from '../components/Reactions';
import moment from 'moment';
import { POST_CREATE_COMMENT_RESET,POST_DETAILS_RESET } from '../constants/postConstants'
import ConfirmationModal from '../components/ConfirmationModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PostScreen() {
    const { id } = useParams();
    const history = useNavigate();

    const [comment, setComment] = useState('');

    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [message, setMessage] = useState(null);
    const [cid, setCid] = useState(null);

    const dispatch = useDispatch();
    
    const postDetails = useSelector((state) => state.postDetails);
    const { loading, error, post } = postDetails;

    const postCommentDelete = useSelector((state) => state.postCommentDelete);
    const { loading: deleteLoading, error: deleteError, success : deleteSuccess } = postCommentDelete;

    const showDeleteModal = (cid) => {
        setCid(cid);
        setMessage(`Are you sure you want to delete this comment '${post.comments.find((x) => x._id === cid).comment}' ? `);

        setDisplayConfirmationModal(true)
    };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
        
    }

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const postCommentsCreate = useSelector((state) => state.postCommentsCreate);
    const { loading: loadingPostComment, error: errorPostComment, success: successPostComment } = postCommentsCreate;

    const userIds = post.comments.map(comment => comment.user);

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

    
    useEffect(() => {
        if(successPostComment){
            setComment('')
            dispatch({type: POST_CREATE_COMMENT_RESET})           
          }else if(deleteSuccess){
            dispatch(listPostDetails(id));
          }      
        dispatch(listPostDetails(id));      
      }, [dispatch, id, deleteSuccess, successPostComment]);

    
      const submitHandler = (e) =>{
            e.preventDefault()
            dispatch(createPostComment(
            id,{
                comment
            }
            ))
        }

        const submitCommentDeleteHandler = (cid) =>{
            dispatch(deletePostComment(cid));
            setDisplayConfirmationModal(false);
        }

    return (
        <div>
            
            <Link to="/" className="btn btn-light my-3">
                <i className="fa fa-home"></i>
            </Link>
            <ToastContainer />

            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) :(
                <div>
                    <Row>
                        <Col md={4}>
                            <Image src={post.image} alt={post.title} fluid />
                        </Col>
                        <Col md={5}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <p className="text-muted">
                                        <span className="badge bg-dark">
                                            {post.categories}
                                        </span>
                                    </p>
                                    <h3>{post.title}</h3>                                    
                                </ListGroup.Item>
                               

                                <ListGroup.Item>
                                    {post.description}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                        <Reactions value={numLikes} likes={post.likes.length} comment={post.comments.length} post={post._id} user={post.user}/>
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>
                        <br/>
                        <Col md={3}>
                            <Trending/>
                        </Col>
                    </Row>

                    <br/>
                    <Row>
                        <Col md={6}>
                            <h3>Comments</h3><hr/>
                            {post.comments.length === 0 && <Message variant='info'>No Comments</Message>}
                            <Card >
                                {post.comments.map((comment) => (
                                    <Card.Body key={comment._id} className="commentList">
                                        <div className="d-flex justify-content-between mt-2 align-items-center">
                                            <strong>{comment.name}</strong> - <small>{moment(comment.createdAt).fromNow()}</small> 
                                        </div>                                      
                                        <p>{comment.comment}</p>


                                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                                            <div className="reply">
                                            
                                                {userInfo && userInfo._id === comment.user ? (
                                                    <small className='reaction'>
                                                        <Link onClick={() => showDeleteModal(comment._id)}>
                                                            <i className="fas fa-trash danger cursor"></i>
                                                        </Link>
                                                        
                                                    </small> 
                                                ):(
                                                    <span> </span>
                                                )} 
                                                <span>  </span>
                                               <small>{comment.createdAt.substring(0,10)}</small>
                                            </div>
                                        </div>
                                    </Card.Body>
                                ))}
                            </Card>
                            <br/>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h4>Write a Comment</h4>
                                    {loadingPostComment && <Loader/>}
                                    {successPostComment && <Message variant='success'>Comment Submitted</Message>}
                                    {errorPostComment && <Message variant='danger'>{errorPostComment}</Message>}
                                
                                    {userInfo ? (
                                            <Form onSubmit={submitHandler}>                                            
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row='5'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </Form.Control>
                                                </Form.Group>
                                                <br/>
                                                <div className="btn-login">
                                                    <Button
                                                        disabled={loadingPostComment}
                                                        type='submit'
                                                        variant = 'primary'
                                                    > 
                                                        Submit
                                                    </Button>
                                                </div>
                                            
                                            </Form>
                                    ) : (
                                        <Message variant='info'>Please <Link to='/login'>Login</Link> to write a comment</Message>
                                    )}

                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )

            }
            <ConfirmationModal variantBtnDel={"danger"} ModalTitle={"Confirmation"} showModal={displayConfirmationModal} confirmModal={submitCommentDeleteHandler} hideModal={hideConfirmationModal}  cid={cid} message={message}  />
        </div>
    );
};

export default PostScreen;
