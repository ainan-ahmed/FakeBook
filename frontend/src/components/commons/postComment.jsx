import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Figure } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
class PostComment extends Component {
    state = {  }
    render() { 
        const {comment} = this.props
        return (
          <Row>
            <div
                    className="bg-secondary mt-2 " width="auto"
            >
              <Col>
                {comment.posted_by.profile_photo && (
                  <div className="profile-thumb ml-2">
                    <Figure className="profile-thumb-middle">
                      <Link to={{ pathname: "/" + comment.posted_by.username }}>
                        <Figure.Image
                          src={comment.posted_by.profile_photo}
                          alt="profile picture"
                        />
                      </Link>
                    </Figure>
                  </div>
                )}
                <div className="posted-author">
                  <h6 className="author">
                    <Link to={{ pathname: "/" + comment.posted_by.username }}>
                      {comment.posted_by.username}
                    </Link>
                  </h6>
                </div>
              </Col>

              <Col>
                <div className="post-content">{comment.body}</div>
              </Col>
            </div>
          </Row>
        );
    }
}
 
export default PostComment;