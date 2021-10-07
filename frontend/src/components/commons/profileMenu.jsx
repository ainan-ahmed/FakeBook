import React, { Component } from "react";
import { Container, Col, Row, Button, Figure, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { followUser, unfollowUser } from "../../store/users";

class ProfileMenu extends Component {
  state = {
    following: false,
  };
  async componentDidMount() {
     if (_.includes(this.props.user.followers, this.props.auth.user.username))
       this.setState({ following: true });
     else this.setState({ following: false });
  }
  handleFollowUnFollow =  () => {
    console.log("Clicked");
    if (!this.state.following)
       this.props.followUser(this.props.user.username);
    else
       this.props.unfollowUser(this.props.user.username);
    window.location.reload();
  };
  
  render() {
    const { profile_photo, auth, user } = this.props;
    // console.log("object "+ username);
    console.log(this.props);
    console.log("object -_-    "+this.state.following);
    return (
      <div className="bg-white mb-3">
        <Container>
          <Row className="align-items-center">
            <Col xs={2} md={3}>
              <div className="mt-2">
                <Figure className="mh-100">
                  <Link to={{ pathname: "/" + auth.user.username }}>
                    <Figure.Image
                      src={profile_photo}
                      alt="profile picture"
                      fluid
                    />
                  </Link>
                </Figure>
              </div>
            </Col>
            <Col >
              <Nav
                variant="pills"
                justify
                className="justify-content-center"
                as="ul"
              >
                <Nav.Item as="li">
                  <Nav.Link>
                    <Link to={"/login"}>Timeline</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link>
                    <Link to={"/login"}>about</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link to={"/login"}>
                    <Link>photos</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link
                    //to={{ "/" + this.props.match.params.username + "/followers"}}
                  >
                    <Link to = {"/" + this.props.match.params.username + "/followers"}>Followers({user.followers.length})</Link>
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item as="li">
                  <Nav.Link
                    to={"/" + this.props.match.params.username + "/following"}
                  >
                    <Link>Following({user.following.length})</Link>
                  </Nav.Link>
                </Nav.Item> */}
                {this.props.match.params.username !== auth.user.username && (
                  <Nav.Item as="li">
                    <Button variant="info" onClick={this.handleFollowUnFollow}>
                      {this.state.following ? "Unfollow" : "Follow"}
                    </Button>
                  </Nav.Item>
                )}
              </Nav>
            </Col>
            {auth.isAuthenticated && !user.username && auth.user.username && (
              <Col xs={2}   className="  ms-auto">
                <div className="">
                  <Button className="text-black" variant="info">
                    <Link to={"/" + auth.user.username + "/edit"}>
                      <div className="text-black font-weight-bold">
                        Edit Pofile
                      </div>
                    </Link>
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  followUser: (username) => dispatch(followUser(username)),
  unfollowUser: (username) => dispatch(unfollowUser(username)),
});
export default connect(null, mapDispatchToProps)(ProfileMenu);
