import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listTrendingPosts } from "../actions/postActions";

function Trending() {
    const dispatch = useDispatch()
    
    const postTrending = useSelector(state => state.postTrending)
    const {error, loading, posts} = postTrending

    useEffect(() => {
        dispatch(listTrendingPosts())
    }, [dispatch])

    return (loading ? <Loader/>
    : error
    ? <Message variant='danger'>{error}</Message>
    : (
        <div>
            <div className="content-section">
                <h3>Trending POST</h3>
                <p className="muted"> These are Posts with high engagements.
                    <ul className="list-group reaction">
                        {posts.map(post => (                            
                                <Link to={`/post/${post._id}`} key={post._id} >                                   
                                    <li className="list-group-item  d-flex justify-content-between align-items-center" >
                                        <Row>
                                            <Col md={10} xs={10}>
                                                {post.title}
                                            </Col>
                                        
                                            <Col md={2} xs={2}>
                                                <Image src={post.image} alt={post.name} fluid/>
                                            </Col>
                                        </Row>
                                        
                                    </li>                                  
                                </Link>                           
                        ))
                        }
                        
                    </ul>
                </p>
            </div>
        </div>
    )
        
    )
}

export default Trending
