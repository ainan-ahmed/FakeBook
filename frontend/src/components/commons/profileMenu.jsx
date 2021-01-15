import React, { Component } from "react";
import "../../css/style.css";
import { Container, Col, Row, Button, Figure, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
class ProfileMenu extends Component {

  handleFollowUnFollow = () => {
    
  }
  render() {
    const { profile_photo, auth, username } = this.props;
    // console.log("object "+ username);
    return (
      <div className="profile-menu-area bg-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={3} md={3}>
              <div className="profile-picture-box">
                <Figure className="profile-picture">
                  <Link to={{ pathname: "/" + username }}>
                    <Figure.Image src={profile_photo} alt="profile picture" />
                  </Link>
                </Figure>
              </div>
            </Col>
            <Col lg={6} md={6} className="offset-lg-1">
              <div className="profile-menu-wrapper">
                <div className="main-menu-inner header-top-navigation">
                  <Nav className="main-menu mt-4 font-weight-bold" as="ul">
                    <Nav.Item as="li">Timeline</Nav.Item>
                    <Nav.Item as="li">about</Nav.Item>
                    <Nav.Item as="li">photos</Nav.Item>
                    <Nav.Item as="li">Followers({auth.user.followers.length})</Nav.Item>
                  </Nav>
                </div>
              </div>
            </Col>
            {auth.isAuthenticated && auth.user.username === username && (
              <Col lg={2} md={3} className="d-none d-md-block">
                <div className="profile-edit-panel">
                  <Button className="edit-btn mt-3" variant="outline-info">
                    <Link to={"/" + username + "/edit"}>Edit Pofile</Link>
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
