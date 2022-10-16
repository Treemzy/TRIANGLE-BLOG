import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup,Row, Col } from "react-bootstrap";
import Jumbotron from '../components/Jumbotron'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Posts from '../components/Posts'
import Trending from '../components/Trending'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from "react-router-dom";
import { listPosts } from '../actions/postActions'
import Reactions from '../components/Reactions'
import Paginate from "../components/Paginate";

function HomeScreen() {
    
    const dispatch = useDispatch();   
    const history = useNavigate();
    const location = useLocation();

    const postList = useSelector((state) => state.postList);
    const { error, loading, posts} = postList;

    const [searchField, setSearchField] = useState("");
    const [searchShow, setSearchShow] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


    const handleClick= (event) =>{
        setCurrentPage(Number(event.target.id));
    }
    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);

        if(currentPage + 1 > maxPageNumberLimit){
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }
    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);

        if((currentPage - 1) % pageNumberLimit == 0 ){
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    const pages = [];

    for(let i = 1; i<=Math.ceil(posts.length/itemsPerPage); i++){
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
        if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
            return(
                <li 
                    className={`page-link ${currentPage === number ? "active" : null}`}
                    key={number} 
                    id={number} 
                    onClick={handleClick}
                >
                  {number} 
                </li>
            )
        }else{
            return null;
        }
        
    })

    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementBtn =  <li onClick={handleNextBtn}>
                                <button 
                                    class="page-link"  
                                    aria-label="Next"
                                    disabled={currentPage == pages[pages.length - 1] ? true : false}
                                    >
                                    <span aria-hidden="true">&hellip;</span>
                                </button>
                            </li>
    }

    let pageDecrementBtn = null;
    if(pages.length > maxPageNumberLimit){
        pageDecrementBtn =  <li onClick={handlePrevBtn}>
                                    <button class="page-link" 
                                            aria-label="Previous"
                                            disabled={currentPage == pages[0] ? true : false}
                                            >
                                        <span aria-hidden="true">&hellip;</span>
                                    </button>
                                </li>
    }
    const filteredPosts = posts.filter(
        x => {
          return (
            x
            .title
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
            x
            .description
            .toLowerCase()
            .includes(searchField.toLowerCase())
          );
        }
      );
      const handleSearch = e => {
        setSearchField(e.target.value);
        if(e.target.value===""){
          setSearchShow(false);
        }
        else {
          setSearchShow(true);
        }
      };

    useEffect(() => {
        dispatch(listPosts());
      }, [ dispatch]);
      
    return (
        <div className="container">
             <Jumbotron/>
             <div className="row">
                <div className="col-md-4">
                    <h1>All POSTS</h1>
                </div>
                <div className="col-md-8">
                    <div className="search">
                        <i className="fa fa-search"></i>
                        <input 
                            className="me-2 form-control"
                            type = "search" 
                            placeholder = "Search Posts" 
                            onChange = {handleSearch}
                        />
                    </div>
                    
                </div>
             </div>
             
             
             {loading ? (
                    <Loader/>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <div className="row">
                        <div className="col-md-8"> 
                                
                                {searchShow ? filteredPosts.map((post) => (                      
                                     <Posts post={post} key={post._id} />                                                        
                                )): 
                                    currentItems.map((post) => (                      
                                        <Posts post={post} key={post._id} />                                                        
                                    ))
                                }  

                                 <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <button class="page-link" 
                                                onClick={handlePrevBtn} 
                                                disabled={currentPage == pages[0] ? true : false}
                                                aria-label="Previous"
                                                >
                                            <span aria-hidden="true">&laquo;</span>
                                            </button>
                                        </li>

                                        {pageDecrementBtn}
                                        {renderPageNumbers} 
                                        {pageIncrementBtn}
                                        <li class="page-item">
                                            <button  class="page-link" 
                                                onClick={handleNextBtn} 
                                                aria-label="Next"
                                                disabled={currentPage == pages[pages.length - 1] ? true : false}
                                                >
                                            <span aria-hidden="true">&raquo;</span>
                                            </button>
                                        </li>
                                    </ul>
                                 </nav>                                                                             
                            </div>
                       <div className="col-md-4">
                          <Trending/>
                       </div>
                       
                    </div>
                    
                    )
                }           
        </div>
    )
}

export default HomeScreen
