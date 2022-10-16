import React, { useState, useEffect } from "react";
import { useNavigate,useLocation, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listCategoryPost, deleteCategory } from "../actions/postActions";
import ConfirmationModal from '../components/ConfirmationModal'

function CategoryScreen() {
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [message, setMessage] = useState(null);
    const [catid, setCatid] = useState(null);
    

    const listCategory = useSelector((state) => state.listCategory);
    const { error:categoryError, loading: categoryLoading, success: categorySuccess, categories } = listCategory; 

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

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

    for(let i = 1; i<=Math.ceil(categories.length/itemsPerPage); i++){
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

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
    const filteredCategories = categories.filter(
        x => {
          return (
            x
            .name
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
        if(!userInfo.isAdmin){
            history("/login")
          }else{
            dispatch(listCategoryPost());
          }        
    },[dispatch, history, userInfo])

    const showDeleteModal = (catid) => {
        setCatid(catid);
        setMessage(`Are you sure you want to delete this post '${categories.find((x) => x._id === catid).name}' ? `);
        setDisplayConfirmationModal(true)
    };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
        
    }

    const deleteHandler = (catid) => {       
        dispatch(deleteCategory(catid));
        setDisplayConfirmationModal(false);
    };

    return (
        <div>
           <Row className="justify-content-md-center">
              <Col>
                <h1>Category</h1>
              </Col>
              
              <Col className="btn-login" xs lg="2">
                <Link className="my-3 btn btn-primary" to="/admin/category/create">
                  <i className="fas fa-plus"></i> Category
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                    <div className="search">
                        <i className="fa fa-search"></i>
                        <input 
                            className="me-2 form-control"
                            type = "search" 
                            placeholder = "Search Category" 
                            onChange = {handleSearch}
                        />
                    </div>
                </Col>
            </Row>
          {categoryLoading ? (
            <Loader />
          ) : categoryError ? (
            <Message variant="danger">{categoryError}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {searchShow ? filteredCategories.map((cat) => (
                  <tr key={cat._id}>
                    <td>{cat.name}</td>
                    
                    <td>
                      <LinkContainer to={`/admin/category/${cat._id}/edit`}>
                        <Button className="btn-sm" variant="light">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        onClick={() => showDeleteModal(cat._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                )):
                    currentItems.map((cat) => (
                    <tr key={cat._id}>
                      <td>{cat.name}</td>
                      
                      <td>
                        <LinkContainer to={`/admin/category/${cat._id}/edit`}>
                          <Button className="btn-sm" variant="light">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          className="btn-sm"
                          variant="danger"
                          onClick={() => showDeleteModal(cat._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                ))}
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
              </tbody>
              
            </Table>
          )}
          <ConfirmationModal variantBtnDel={"danger"} ModalTitle={"Confirmation"} showModal={displayConfirmationModal} confirmModal={deleteHandler} hideModal={hideConfirmationModal}  catid={catid} message={message}  />
        </div>
      );
}

export default CategoryScreen
