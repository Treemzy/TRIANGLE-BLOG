import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {  deletePostComment, listComments } from "../actions/postActions";
import { POST_LIST_COMMENTS_RESET } from '../constants/postConstants'
import ConfirmationModal from '../components/ConfirmationModal'

function CommentsListScreen() {
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [message, setMessage] = useState(null);
    const [cid, setCid] = useState(null);

    const postList = useSelector((state) => state.postList);
    const { error:postError, loading:postLoading, posts } = postList;

    const commentList = useSelector((state) => state.commentList);
    const { error, loading, comments } = commentList;

    const postCommentDelete = useSelector((state) => state.postCommentDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = postCommentDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({type: POST_LIST_COMMENTS_RESET})
    
        if(!userInfo.isAdmin){
          history("/login")
        }else{
          dispatch(listComments());
        }
      }, [dispatch, history, userInfo, successDelete]);

    const showDeleteModal = (cid) => {
        setCid(cid);
        setMessage(`Are you sure you want to delete this comment '${comments.find((x) => x._id === cid).comment}' ? `);        
        setDisplayConfirmationModal(true)
    };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
        
    }

    const deleteHandler = (cid) => {       
        dispatch(deletePostComment(cid));
        setDisplayConfirmationModal(false);
    };

    return (
        <div>
            <Row className="justify-content-md-center">
              <Col>
                <h1>Comments</h1>
              </Col>
             
            </Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>POST TITLE</th>
                  <th>USER</th>
                  <th>COMMENT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment._id}>
                    <td>{comment.posts}</td>
                    <td>{comment.users}</td>
                    <td>{comment.comment}</td>
                    <td>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        onClick={() => showDeleteModal(comment._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <ConfirmationModal variantBtnDel={"danger"} ModalTitle={"Confirmation"} showModal={displayConfirmationModal} confirmModal={deleteHandler} hideModal={hideConfirmationModal}  cid={cid} message={message}  />
        </div>
    );
}

export default CommentsListScreen
