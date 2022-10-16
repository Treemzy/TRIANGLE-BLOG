import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

function AboutScreen() {
    return (
        <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
            <Accordion.Header>About this Blog ? </Accordion.Header>
            <Accordion.Body>
            Triangle is a BLOG web application with the features of creating posts, commenting on posts and liking of desired posts: before performing any of these actions you must sign up and account with TRIANGLE. !
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Must I Have an account before making a post ?</Accordion.Header>
            <Accordion.Body>
                YES
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Must I Have an account before commenting or liking a post ?</Accordion.Header>
            <Accordion.Body>
                YES
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
    )
}

export default AboutScreen
