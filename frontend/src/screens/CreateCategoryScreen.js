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
import { createCategory, listCategoryPost } from '../actions/postActions'
import axios from 'axios';
import { CATEGORY_CREATE_RESET } from '../constants/postConstants'

function CreateCategoryScreen() {

    const history = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const { error:errorCategoryCreate, loading: loadingCategoryCreate, success: successCategoryCreate } = categoryCreate;

    const [formData, setFormData] = useState({
        name: "",
    });

    const [errors, setErrors] = useState({
        name: "",
    });

    const handleChange = ({ currentTarget: input }) => {
        let newData = { ...formData };
        newData[input.name] = input.value;
        setFormData(newData);
    };

    const clearForm = () => {  
           
        setFormData({
            name: "",           
        })
    }

    const doSubmit = async (e) => {        
        e.preventDefault();
        if(formData.name.trim().length === 0){
            setErrors({
                "name": [
                    "name field is required."
                ]
            })
        }else{
            try{
                await dispatch(createCategory(
                    formData,
                    
                ));
            } catch (error){
                console.log(error)
            }

        }    
    };

    useEffect(() => {
        if (!userInfo.isAdmin) {
          history("/login");
        }
        else if (successCategoryCreate) {
            clearForm()   
            toast.success('Category Created Successfully.', {
                position: toast.POSITION.TOP_RIGHT
            }); 
            dispatch({type: CATEGORY_CREATE_RESET})    
            dispatch(listCategoryPost());       
          }
        dispatch(listCategoryPost());
      }, [dispatch, history, userInfo, errorCategoryCreate, successCategoryCreate]);


    return (
        <div>
             <Link to="/admin/category" className="btn btn-light my-3">
                <i className="fa fa-home"></i>
            </Link> 
            <FormContainer>                            
                <ToastContainer/>
                <h4 className="text-center">Create Category</h4>
                {loadingCategoryCreate ? (<Loader/>
                    ) : errorCategoryCreate ? (
                    <Message variant="danger">{errorCategoryCreate}</Message>
                    ) : (

                        <Form className="createLabel" validated>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="Enter Category"
                                    value={formData.name}
                                    isInvalid={errors.name}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                                {errors.name && (
                                    <Form.Text className="errMsg text-danger">
                                            {errors.name}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <div className="btn-login">
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={(e) => doSubmit(e)}
                                >
                                SUBMIT
                            </Button>
                        </div>
                        
                </Form>
                )
            }

            </FormContainer>
        </div>
    )
}

export default CreateCategoryScreen
