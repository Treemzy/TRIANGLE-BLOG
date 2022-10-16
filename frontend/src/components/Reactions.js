import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { createPostLike, listPostDetails, listPosts, deletePost } from "../actions/postActions";
import { POST_CREATE_LIKE_RESET } from '../constants/postConstants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from '../components/ConfirmationModal'

function Reactions({value, likes, comment, post, userLike, user}) {

    const { id } = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();

    let [numLikes, setnumLikes] = useState(0);

    const postLikes = useSelector((state) => state.postLikes);
    const { loading, error,  success: successLike } = postLikes;

    
    const postDelete = useSelector((state) => state.postDelete);
    const { loading:loadingPostDelete, error: errorPostDelete,  success: successPostDelete } = postDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const postList = useSelector((state) => state.postList);
    const { error:postListError, loading:postListLoading, posts } = postList;

    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [message, setMessage] = useState(null);
    const [pid, setPid] = useState(null);



    const showDeleteModal = (pid) => {
        setPid(pid);
        setMessage(`Are you sure you want to delete this post '${posts.find((x) => x._id === pid).title}' ? `);
        setDisplayConfirmationModal(true)
    };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
        
    }

    const submitPostDeleteHandler = (pid) =>{
        dispatch(deletePost(pid));
        setDisplayConfirmationModal(false);
    }

   

    useEffect(() => {
        if(successLike){
            setnumLikes(0)          
        } 
        if(successPostDelete){
            history('/')
        }  
      }, [dispatch, post, successLike, successPostDelete]);

    const submitLikeHandler = (e) =>{
        e.preventDefault()
        dispatch(createPostLike(
          post,{
            numLikes
          }
        ))
    }

    return (
        <div className="reactions">
            <ToastContainer />
            {userInfo ? (
                
                <span className="likeAction">
                    <Link onClick={submitLikeHandler}>
                        <span>
                            <i
                            style={{ color:"#e60000" }}
                            className={
                                value >= 1
                                ? "fa fa-heart"
                                : value == 0
                                ? "fa-regular fa-heart"                   
                                : "far fa-heart-o"
                            }
                            ></i>
                            {likes}
                            

                        </span> 
                    </Link>
                </span>
                
            ):(
                <span className='reaction'>
                    <Link to='/login'>
                        <i
                        style={{ color:"#e60000" }}
                        className={
                            value >= 1
                            ? "fa fa-heart"
                            : value == 0
                            ? "fa-regular fa-heart"                   
                            : "far fa-heart-o"
                        }
                        ></i>
                        {likes}
                    </Link>
                   
                </span> 
            )}     
            
             <span className="reaction">
                 <Link to={`/post/${post}`}>
                    <i
                    style={{ color:"" }}
                    className={"fa fa-comment"}
                    ></i>
                    {comment}
                 </Link>
               
            </span>


            <span>
                <i
                style={{ color:"" }}
                className={"fa fa-share"}
                ></i>
            </span>
            <span>  </span>
            <span>  </span>
            {userInfo && userInfo._id === user ? (
                <small className='reactionDel'>
                    <Link onClick={() => showDeleteModal(post)}>
                        <i className="fas fa-trash danger cursor"></i>
                    </Link>
                    
                </small> 
            ):(
                <span> </span>
            )} 
            {userInfo && userInfo._id === user ? (
                <small className='reactionEdit'>
                    <Link to={`/post/${post}/edit`}>
                        <i className="fas fa-edit cursor"></i>
                    </Link>
                    
                </small> 
            ):(
                <span> </span>
            )} 
            
            <ConfirmationModal variantBtnDel={"danger"} ModalTitle={"Confirmation"} showModal={displayConfirmationModal} confirmModal={submitPostDeleteHandler} hideModal={hideConfirmationModal}  pid={pid} message={message}  />
        </div>
    )
}

export default Reactions
