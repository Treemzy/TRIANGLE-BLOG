import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listCategoryPost, categoryDetail, updateCategory } from "../actions/postActions";
import { CATEGORY_UPDATE_RESET } from '../constants/postConstants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CategoryEditScreen() {

    const { id } = useParams();
    const categoryId = id;

    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const categoryDetails = useSelector((state) => state.categoryDetails);
    const { error, loading, category } = categoryDetails;

    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const { error:errorCategoryUpdate, loading: loadingCategoryUpdate, success: successCategoryUpdate } = categoryUpdate;

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

    useEffect(() => {         
        if(successCategoryUpdate){
            dispatch({type: CATEGORY_UPDATE_RESET})
            history('')
            toast.success('Updated Successfully.', {
                position: toast.POSITION.TOP_RIGHT
            }); 
        }else{
            if (!category.name || category._id !== Number(categoryId)) {
              dispatch(categoryDetail(categoryId));
              } else {                 
                let setData = { ...formData };
                setData["name"] = category.name;
                setFormData(setData)
              } 
          }        
        dispatch(listCategoryPost());    
    }, [dispatch, category, categoryId, history, successCategoryUpdate]);

    const doSubmit = async (e) => {        
        e.preventDefault();
           await dispatch(updateCategory({
                _id: categoryId,
                name: formData.name,                
            }));    
         };


    return (
        <div>
            <Link to="/admin/category" className="btn btn-light my-3">
                <i className="fa fa-home"></i>
            </Link> 
            <FormContainer>                            
                <ToastContainer/>
                <h4 className="text-center">Update Category</h4>
                {loadingCategoryUpdate ? (<Loader/>
                    ) : errorCategoryUpdate ? (
                    <Message variant="danger">{errorCategoryUpdate}</Message>
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

export default CategoryEditScreen
