import React, { Component } from "react";
import BaseForm from "./commons/form";
import { Card, Container } from "react-bootstrap";

class EditProfile extends BaseForm {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Container className="mt-5">
          <Card>
            <Card.Title style={{backgroundColor:"lightblue"}} className="text-center">Edit Profile</Card.Title>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

export default EditProfile;
