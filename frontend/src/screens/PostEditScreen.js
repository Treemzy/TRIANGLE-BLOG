import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listPostDetails, listCategoryPost, updatePost } from "../actions/postActions";
import { POST_UPDATE_RESET } from '../constants/postConstants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostEditScreen() {

    const { id } = useParams();
    const postId = id;

    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    
    const listCategory = useSelector((state) => state.listCategory);
    const { error:categoryError, loading: categoryLoading, success: categorySuccess, categories } = listCategory; 
    
    const postDetails = useSelector((state) => state.postDetails);
    const { error, loading, post } = postDetails;

    const postUpdate = useSelector((state) => state.postUpdate);
    const { error:errorUpdate, loading:loadingUpdate, success: successUpdate } = postUpdate;

  
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        category:"",
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        image: "",
        category:"",
    });

    const handleChange = ({ currentTarget: input }) => {
        let newData = { ...formData };
        newData[input.name] = input.value;
        setFormData(newData);
    };

    const handleImageChange = (e) => {
        let newData = { ...formData };
        newData["image"] = e.target.files[0];
        
        setFormData(newData);
    };





    useEffect(() => {         
        if(successUpdate){
            dispatch({type: POST_UPDATE_RESET})
            history('')
            toast.success('Updated Successfully.', {
                position: toast.POSITION.TOP_RIGHT
            }); 
        }else{
            if (!post.title || post._id !== Number(postId)) {
              dispatch(listPostDetails(postId));
              } else {                 
                let setData = { ...formData };
                setData["image"] = post.image;
                setData["title"] = post.title;
                setData["description"] = post.description;
                setData["category"] = post.category;

                setFormData(setData)
              } 
          }        
        dispatch(listCategoryPost());    
    }, [dispatch, post, postId, history, successUpdate]);

    
    const doSubmit = async (e) => {        
        e.preventDefault();
           await dispatch(updatePost({
                _id: postId,
                title: formData.title,
                image: formData.image,
                category: formData.category,
                description: formData.description,                
            }));    
         };

    return (
        <div>
             <Link to="/" className="btn btn-light my-3">
                <i className="fa fa-home"></i>
            </Link>
             <FormContainer>
            <ToastContainer/>
           

            <h4 className="text-center">Update Post</h4>
            {loadingUpdate?(
                <Loader/>
                ) : error ? (
                <Message variant="danger">{errorUpdate}</Message>
                ) : (
                    <Form className="createLabel" validated>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    required
                                    as="select"
                                    name="category"
                                    value={formData.category ? formData.category : '' }
                                    isInvalid={errors.category}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                >
                            
                                {
                                    categories.map((c) => 
                                    
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    )
                                }
                                {errors.category && (
                                    <Form.Text className="errMsg text-danger">
                                            {errors.category}
                                    </Form.Text>
                                )}
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" >
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="title"
                                    placeholder="Type Your Post Title"
                                    value={formData.title}
                                    isInvalid={errors.title}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                                {errors.title && (
                                    <Form.Text className="errMsg text-danger">
                                            {errors.title}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Row>
                        
                            <Form.Group className="mb-3">
                                <Form.Label>Current Image</Form.Label>
                                <Col md={2} xs={2} lg={2} >
                                    <Image src={post.image} alt={post.title} fluid />
                                </Col>
                            </Form.Group>
                        
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    id = "myFile"
                                    type="file"
                                    name="image"
                                    accept="image/jpeg,image/png,image/gif"
                                    onChange={(e) => {
                                        handleImageChange(e);
                                    }}
                                />
                                {errors.image && (
                                    <Form.Text className="errMsg text-danger">
                                        {errors.image}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                required
                                rows={10}
                                name="description"
                                placeholder="Type Description"
                                value={formData.description}
                                isInvalid={errors.description}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                            {errors.description && (
                                <Form.Text className="errMsg text-danger">
                                    {errors.description}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <div className="btn-login">
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={(e) => doSubmit(e)}
                                >
                                UPDATE
                            </Button>
                        </div>
                        
                </Form>
                    )
            } 
            
        </FormContainer>
        </div>
       
    )
}

export default PostEditScreen
