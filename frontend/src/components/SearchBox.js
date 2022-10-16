import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from "react-router-dom";


function SearchBox() {

    const [keyword, setKeyword] = useState('')
    const history = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            history(`/?keyword=${keyword}&page=1`)
        }else{
            history(location.pathname)
        }
    }

    return (
        <div>
            <Form onSubmit={submitHandler} className='d-flex'>
                <Form.Control
                    type='text'
                    name='search'
                    onChange={(e) => setKeyword(e.target.value)}
                    className = 'me-2'
                >
                </Form.Control>    
                <Button
                    type='submit'
                    variant='outline-success'
                    className = 'p-2'
                >
                    <i className="fa fa-search"></i>
                </Button>
            </Form>        
        </div>
    )
}

export default SearchBox
