import React, { Component } from "react";
import { Container, Col, Row, Button, Figure, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
class ProfileMenu extends Component {

  handleFollowUnFollow = () => {
    
  }
  render() {
    const { profile_photo, auth, user } = this.props;
    // console.log("object "+ username);
    console.log(user);
    return (
      <div className="bg-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={2} md={3}>
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
            <Col lg={6} md={6} className="">
              <Nav className="justify-content-center" as="ul" variant="pills">
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
                  <Nav.Link to={"/login"}>
                    <Link>Followers({user.followers.length})</Link>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            {auth.isAuthenticated && !user.username && auth.user.username && (
              <Col lg={2} md={3} className="d-none d-md-block  ms-auto">
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

export default ProfileMenu;
