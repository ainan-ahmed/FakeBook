import React, { Component } from "react";
import moment from "moment";

import {
  Image,
  Button,
  Card,
  Figure,
} from "react-bootstrap";
import "../../css/style.css";
class Post extends Component {
    render() {
      const { post } = this.props
      console.log(post);
    return (
      <React.Fragment>
        <Card className="mt-4 p-2">
          <Card.Title className="allign-items-center d-flex">
            <div className="profile-thumb ml-2">
            <a href="">
              <Figure className="profile-thumb-middle">
                <Image src={post.user.profile_photo} alt="profile picture" />
              </Figure>
            </a>
          </div>
            <div className="posted-author">
              <h6 className="author">
                <a href="">{post.user.username}</a>
              </h6>
              <span className="post-time ">
                {moment(post.date_created).format("Do MMMM,YYYY")}
              </span>
            </div>
            <div className="post-settings-bar">
              <span></span>
              <span></span>
              <span></span>
              <div className="post-settings arrow-shape">
                <ul>
                  <li>
                    <button>copy link to adda</button>
                  </li>
                  <li>
                    <button>edit post</button>
                  </li>
                </ul>
              </div>
            </div>
          </Card.Title>
          <Card.Body className="post-content">
            <p className="post-desc pb-0">{post.description}</p>
            <div className="post-thumb-gallery">
              <Figure className="post-thumb img-popup ">
                <a href="">
                  <Image src={post.image} alt="post image" fluid></Image>
                </a>
              </Figure>
            </div>
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
        </Card>
      </React.Fragment>
    );
  }
}

export default Post;
