import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserDetails } from "../store/users";
import { Container, Col, Spinner, Row, Card } from "react-bootstrap";
import ProfileMenu from "./commons/profileMenu";
import Post from "./commons/post";
import ShareBox from "./commons/shareBox";
import _ from "lodash";
class Profile extends Component {
  state = {
    user: null,
  };
  async componentDidMount() {
    console.log("Mount called");
    const username = this.props.match.params.username;
    console.log("->>>" + username);
    //let user= null;
    try {
      console.log(username);
      const user = await this.props.getUserDetails(username);
      //console.log(user);
      this.setState({ user });
    } catch (error) {
      console.log("error while fetching user");
    }
  }

  render() {
    let { user } = this.state;
    const { auth } = this.props;
    console.log(user);
    if (!auth.isLoading && user) {
      //console.log(user.username);
      const { posts } = user;
      console.log(posts);
      let cover = {
        backgroundImage: "url(" + user.cover_photo + ")",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        minHeight: 350,
        borderRadius: "0 0 4px 4px",
        position: "relative",
      };
      return (
        <React.Fragment>
          <div  style={{ backgroundColor: "#f1f1f1" }}>
            <div className="profile-banner-large bg-img" style={cover}></div>
            <ProfileMenu
              profile_photo={user.profile_photo}
              auth={auth}
              user={user}
            />
            <Container>
              <Row>
                <Col lg={3} order={2}>
                  <aside className=" profile-sidebar">
                    <Card className="">
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
                        <div className="author-into-list">
                          <div className="font-weight-bold">
                            <i
                              className="fa fa-home mr-1"
                              aria-hidden="true"
                            ></i>
                            Bangladesh
                          </div>
                          <div className="font-weight-bold">
                            <i
                              className="fa fa-rss mr-1"
                              aria-hidden="true"
                            ></i>
                            Followed by {user.followers.length} people
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </aside>
                </Col>
                <Col lg={6} order={2}>
                  {auth && <ShareBox auth={auth} />}
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
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  getUserDetails: (username) => dispatch(getUserDetails(username)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
