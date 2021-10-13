import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col,Row,Image,Card } from 'react-bootstrap';
class PostComment extends Component {
    state = {  }
    render() { 
      const { comment } = this.props
      console.log(comment);
        return (
          <div className="mt-2  ">
            <Row>
              <Col md={2}>
                {comment.posted_by.profile_photo && (
                  <div className="d-flex align-items-start">
                    <Link to={{ pathname: "/" + comment.posted_by.username }}>
                      <Image
                        src={comment.posted_by.profile_photo}
                        alt="profile picture"
                        fluid
                        roundedCircle
                      />
                    </Link>
                  </div>
                )}
              </Col>
              <Col md={2}>
                <div className="d-flex mt-3 align-items-start ">
                  <h6 className="">
                    <Link to={{ pathname: "/" + comment.posted_by.username }}>
                      {comment.posted_by.username}
                    </Link>
                  </h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="ms-5 border border-dark align-items-end">
                  {comment.body}{" "}
                </div>
              </Col>
            </Row>
          </div>
        );
    }
}
 
export default PostComment;