import React, { Component } from "react";
import { Card, Container, ListGroup, Spinner,Row,Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails } from "../store/users";
import ProfileMenu from './commons/profileMenu';

class Followers extends React.Component {
    state = {
        user: null,
        isAuth: false,
    };
    async componentDidMount() {
        console.log("Mount called");
        const username = this.props.match.params.username;
        console.log(this.props);
        if (username === this.props.auth.user.username)
            this.setState({ isAuth: true });
        //let user= null;
        try {
            console.log(username);
            const user = await this.props.getUserDetails(username);
            console.log(user);
            this.setState({ user });
        } catch (error) {
            console.log("error while fetching user");
        }
    }
    render() {
        const { user, isAuth } = this.state;
        console.log(user, isAuth);
        const { auth } = this.props;
        //  const { following } = user.following;
        // const { followers } = user.followers;
        if (!auth.isLoading && user) {
          //console.log(user.username);
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
              <div style={{ backgroundColor: "#f1f1f1" }}>
                <div
                  className="profile-banner-large bg-img"
                  style={cover}
                ></div>
                <ProfileMenu
                  {...this.props}
                  profile_photo={user.profile_photo}
                  auth={auth}
                  user={user}
                />

                <Container>
                  <Card style={{ width: "auto" }} className="mt-5 ">
                    <Card.Body>
                      <Card.Title className="p-4  text-center font-weight-bold">
                        <h2 className="">
                          {user.username} is Followed by {user.followers.length}{" "}
                          people.
                        </h2>
                      </Card.Title>
                      {user.followers.map((user) => (
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <Row>
                              <Col
                                sm={6}
                                style={{
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              >
                                {user}
                              </Col>
                              <Col
                                style={{
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              >
                                <Link to={"/" + user}>
                                  <Button variant="outline-success">
                                    View Profile
                                  </Button>
                                </Link>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      ))}
                    </Card.Body>
                  </Card>

                  {isAuth && (
                    <Card style={{ width: "auto" }} className="mt-5 ">
                      <Card.Body>
                        <Card.Title className="p-4  text-center font-weight-bold">
                          <h2 className="">
                            {user.username} is Following {user.following.length} people.
                          </h2>
                        </Card.Title>
                        {user.following.map((user) => (
                          <ListGroup variant="flush">
                            <ListGroup.Item>
                              <Row>
                                <Col
                                  sm={6}
                                  style={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                  }}
                                >
                                  {user}
                                </Col>
                                <Col
                                  style={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                  }}
                                >
                                  <Link to={"/" + user}>
                                    <Button variant="outline-success">
                                      View Profile
                                    </Button>
                                  </Link>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          </ListGroup>
                        ))}
                      </Card.Body>
                    </Card>
                  )}
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
export default connect(mapStateToProps, mapDispatchToProps)(Followers);
