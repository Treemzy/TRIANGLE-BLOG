import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listPosts, deletePost, listCategoryPost } from "../actions/postActions";
import { POST_CREATE_RESET } from '../constants/postConstants'
import ConfirmationModal from '../components/ConfirmationModal'
import moment from 'moment';

function PostListScreen() {
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [message, setMessage] = useState(null);
    const [pid, setPid] = useState(null);

    const postList = useSelector((state) => state.postList);
    const { error, loading, posts, page, pages } = postList;

    const postCreate = useSelector((state) => state.postCreate);
    const { error:errorPostCreate, loading: loadingPostCreate, success: successPostCreate } = postCreate;

    const listCategory = useSelector((state) => state.listCategory);
    const { error:categoryError, loading: categoryLoading, success: categorySuccess, categories } = listCategory; 

    const postDelete = useSelector((state) => state.postDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = postDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({type: POST_CREATE_RESET})
    
        if(!userInfo.isAdmin){
          history("/login")
        }else{
          dispatch(listPosts());
        }
        dispatch(listCategoryPost());
      }, [dispatch, history, userInfo, successDelete]);

    const showDeleteModal = (pid) => {
        setPid(pid);
        setMessage(`Are you sure you want to delete this post '${posts.find((x) => x._id === pid).title}' ? `);
        setDisplayConfirmationModal(true)
    };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
        
    }

    const deleteHandler = (pid) => {       
        dispatch(deletePost(pid));
        setDisplayConfirmationModal(false);
    };
    
    const userIds = categories.map(cat => cat.name);
    
    return (
        <div>
            <Row className="justify-content-md-center">
              <Col>
                <h1>Posts</h1>
              </Col>
              <Col className="btn-login" xs lg="2">
                <Link className="my-3 btn btn-primary" to="/createpost">
                  <i className="fas fa-plus"></i> Create Post
                </Link>
              </Col>
            </Row>

          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}

          {loadingPostCreate && <Loader />}
          {errorPostCreate && <Message variant="danger">{errorPostCreate}</Message>}  

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div>
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                     
                      <th>TITLE</th>  
                      <th>CATEGORY</th>
                      <th>DATE CREATED</th>               
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post._id} >
                       
                        <td>{post.title}</td>
                        <td> 
                            {post.categories}                      
                        </td>
                        <td>{moment(post.createdAt).fromNow()}</td>
                        <td>
                          <LinkContainer to={`/post/${post._id}/edit`}>
                            <Button className="btn-sm" variant="light">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          <span> </span>
                          <Button
                            className="btn-sm"
                            variant="danger"
                            onClick={() => showDeleteModal(post._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                          <span> </span>
                          <LinkContainer to={`/post/${post._id}`}>
                            <Button className="btn-sm" variant="secondary">
                              <i className="fas fa-eye"></i>
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                
            </div>
            
          )}

           <ConfirmationModal variantBtnDel={"danger"} ModalTitle={"Confirmation"} showModal={displayConfirmationModal} confirmModal={deleteHandler} hideModal={hideConfirmationModal}  pid={pid} message={message}  /> 
        </div>
    )
}

export default PostListScreen
