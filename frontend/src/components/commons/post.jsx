import React, { Component } from "react";
import moment from "moment";
import { Image, Button, Card, Figure,Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostComment from "./postComment";
class     Post extends Component {
  render() {
    const { post, auth } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        <Card className="mt-4 p-2">
          <Card.Title className="allign-items-center d-flex">
            <Row>
              {post.user.profile_photo && (
                <Col md={2} className="ms-2">
                  <Figure className="justify-content-center ">
                    <Link to={{ pathname: "/" + post.user.username }}></Link>
                    <Figure.Image
                      src={post.user.profile_photo}
                      alt="profile picture"
                      style={{ borderRadius: 50 }}
                    />
                  </Figure>
                </Col>
              )}
              <Col>
                <h6 className="">
                  <Link to={{ pathname: "/" + post.user.username }}>
                    {post.user.username}
                  </Link>
                </h6>
                <div className="" style={{ fontSize: 10, fontWeight: 700 }}>
                  {moment(post.date_created).format("Do MMMM,YYYY")}
                </div>
              </Col>
            </Row>
          </Card.Title>
          <Card.Body className="post-content">
            <p className="post-desc pb-0">{post.description}</p>
            {post.image && (
              <div className="post-thumb-gallery">
                <Figure className="post-thumb img-popup ">
                  <Image src={post.image} alt="post image" fluid></Image>
                </Figure>
              </div>
            )}
          </Card.Body>
          <Card.Footer className="post-meta">
            <Button className="post-meta-like" variant="light">
              <i className="fa fa-heart"></i>
            </Button>
            <span>
              <strong>{post.users_like.length}</strong> people like this
            </span>
            <div className="comment-share-meta">
              <Button variant="light">
                <i className="fa fa-comment"></i>
                <span className="ml-1">{post.comments.length}</span>
              </Button>
            </div>
          </Card.Footer>
          <Row className="bg-light p-2">
            <Col md={2} className="d-flex flex-row align-items-start w-5  ">
              
              <Image src={auth.user.profile_photo} roundedCircle fluid responsive />
            </Col>
            <Col class="mt-2 text-right">
              <textarea className="form-control ml-1 shadow-none textarea"></textarea>
              <button class="btn btn-primary btn-sm shadow-none" type="button">
                Post comment
              </button>
              {/* <button
                class="btn btn-outline-primary btn-sm ml-1 shadow-none"
                type="button"
              >
                Cancel
              </button> */}
            </Col>
          </Row>
           {post.comments.length && post.comments.map(comment => <PostComment comment={comment}/>)} 
        </Card>
      </React.Fragment>
    );
  }
}

export default Post;
