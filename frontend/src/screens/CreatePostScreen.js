import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, FormControl, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPost, listCategoryPost, listPosts } from '../actions/postActions'
import axios from 'axios';
import { POST_CREATE_RESET } from '../constants/postConstants'

function CreatePostScreen() {
    const history = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const listCategory = useSelector((state) => state.listCategory);
    const { error:categoryError, loading:categoryLoading, success:categorySuccess, categories } = listCategory;

    const postCreate = useSelector((state) => state.postCreate);
    const { error:errorPostCreate, loading: loadingPostCreate, success: successPostCreate } = postCreate;


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
    const clearForm = () => {  
        document.getElementById("myFile").value = "";      
        setFormData({
            title: "",
            description: "",
            image: "",
            category: "",
            newData: "",
        })

    }

    const doSubmit = async (e) => {        
        e.preventDefault();
        if(formData.title.trim().length === 0){
            setErrors({
                "title": [
                    "Title field is required."
                ]
            })
        }else if(formData.image.length === 0){
            setErrors({
                "image": [
                    "Image field is required."
                ]
            })
        }
        else if(formData.description.trim().length === 0){
            setErrors({
                "description": [
                    "Description field is required."
                ]
            })
        }
        else if(formData.category.trim().length === null){
            setErrors({
                "category": [
                    "Category field is required."
                ]
            })
        }       
        else{
            try{
                await dispatch(createPost(
                    formData,
                    
                ));
            } catch (error){
                console.log(error)
            }

        }
              
    };
    useEffect(() => {
        if (!userInfo) {
          history("/login");
        }
        else if (successPostCreate) {
            clearForm()   
            toast.success('Posted Successfully.', {
                position: toast.POSITION.TOP_RIGHT
            }); 
            dispatch({type: POST_CREATE_RESET})    
            dispatch(listPosts());       
          }
        dispatch(listCategoryPost());
      }, [dispatch, history, userInfo,errorPostCreate,successPostCreate]);

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                <i className="fa fa-home"></i>
            </Link>
            <FormContainer>
            <ToastContainer/>
            <h4 className="text-center">Create Post</h4>
            {loadingPostCreate ? (<Loader/>
                ) : errorPostCreate ? (
                <Message variant="danger">{errorPostCreate}</Message>
                ) : (
                    
                    <Form className="createLabel" validated>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    required
                                    as="select"
                                    name="category"
                                    defaultValue={{label: "Select", value:0}}
                                    value={formData.category ? formData.category : '' }
                                    isInvalid={errors.category}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                >
                                <option key={'empty'} value={''} defaultValue hidden> 
                                    {'-- Select Category --'}
                                </option>
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
                            <Form.Group className="mb-3">
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
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    id = "myFile"
                                    required
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
                                POST
                            </Button>
                        </div>
                        
                </Form>
                )
            }
            
        </FormContainer>
        </div>
        
    )
}

export default CreatePostScreen
