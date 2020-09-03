import React, { Component } from 'react';
import { Card,Form,Modal,Button,Col } from 'react-bootstrap';

class ShareBox extends Component {
  state = {
    showModal: false,
  };
  handleModalToggle = () => {
    const ff = this.state.showModal ? false : true;
    this.setState({ showModal: ff });
  };
    render() {
      const {showModal} = this.state
    return (
      <React.Fragment>
        <Card>
          <div className="share-content-box w-100 p-2">
            <Form className="share-text-box">
              <textarea
                name="share"
                className="share-text-field"
                aria-disabled="true"
                placeholder="what's on your mind?"
                data-toggle="Modal"
                data-target="#textbox"
                id="email"
                onClick={this.handleModalToggle}
              />
            </Form>
          </div>
        </Card>
        <Modal
          className="fade"
          show={showModal}
          onHide={this.handleModalToggle}
        >
          <Modal.Header closeButton>
            <Modal.Title>Share your status</Modal.Title>
          </Modal.Header>
          <Modal.Body class="custom-scroll">
            <textarea
              name="share"
              class="share-field-big custom-scroll"
              placeholder="Say Something"
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"danger"} className="post-share-btn" onClick={this.handleModalToggle}>
              Cancel
            </Button>
            <Button className="post-share-btn">Post</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
 
export default ShareBox;