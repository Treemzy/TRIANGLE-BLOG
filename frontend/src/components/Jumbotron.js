import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

function Jumbotron() {
    return (
        <div>
            <div className="p-5 mb-4 text-white bg-dark rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold text-white">Welcome To Triangle <FontAwesomeIcon icon={faAngleUp}/></h1>
                    <p className="col-md-12 fs-4">
                        Triangle is a BLOG web application with the features of creating posts, commenting on posts and liking of desired posts: before performing any of these actions you must sign up and account with TRIANGLE. !
                    </p>
                    
                </div>
            </div>
        </div>
    )
}

export default Jumbotron
