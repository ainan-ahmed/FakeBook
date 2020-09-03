import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../store/users";

import {
  Image,
  Container,
  Col,
  Spinner,
  Row,
  Nav,
  Button,
  Card,
  Form,
  Modal,
  Figure,
} from "react-bootstrap";
import "../css/style.css";
import ProfileMenu from "./commons/profileMenu";
import Post from "./commons/post";
import ShareBox from "./commons/shareBox";
class Profile extends Component {
  state = {
    user: null,
  };
  async componentDidMount() {
    const username = this.props.match.params.username;
    console.log("->>>" + username);
    if (this.props.auth.user && username !== this.props.auth.user.username) {
      try {
        console.log(username);
        const user = await this.props.getUser(username);
        //console.log(user);
        this.setState({ user });
      } catch (error) {
        console.log("error while fetching user");
      }
    }
  }

  render() {
    let { user } = this.state;
    const { auth } = this.props;
    if (user === null) user = auth.user;
    console.log(user);
    if (!auth.isLoading && user) {
      //console.log(user.username);
      const { posts } = user;
      let cover = {
        backgroundImage: "url(" + user.cover_photo + ")",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        minHeight: 360,
        borderRadius: "0 0 4px 4px",
        position: "relative",
      };
      return (
        <React.Fragment>
          <div className="main-wrapper" style={{ backgroundColor: "#f1f1f1" }}>
            <div className="profile-banner-large bg-img" style={cover}></div>
            <ProfileMenu
              profile_photo={user.profile_photo}
              auth={auth}
              username={user.username}
            />
            <Container>
              <Row>
                <Col lg={3} order={2}>
                  <aside className="widget-area profile-sidebar">
                    <Card className="widget-item">
                      <Card.Title
                        autoCapitalize="true"
                        className="text-center p-2"
                      >
                        <p className="widget-title">
                          {user.first_name} {user.last_name}
                        </p>
                      </Card.Title>
                      <Card.Body className="widget-body">
                        <div className="about-author">
                          <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Reprehenderit placeat aut fugiat error
                            voluptate impedit eaque beatae velit voluptatem,
                            libero, nisi quasi expedita minus mollitia.
                            Architecto ratione suscipit fugiat dignissimos!
                          </p>
                        </div>
                        <ul className="author-into-list">
                          <li>
                            <a href="" className="font-weight-bold">
                              Bangladesh
                            </a>
                          </li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </aside>
                </Col>
                <Col lg={6} order={2}>
                  <ShareBox />
                  {posts && posts.map((post) => <Post post={post} />)}
                </Col>
              </Row>
            </Container>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <Spinner
          animation="border"
          variant="primary"
          role="status"
          size="xl"
          className="justify-content-center"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  auth: state.entities.auth,
});
const mapDispatchToProps = (dispatch) => ({
  getUser: (username) => dispatch(getUser(username)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
