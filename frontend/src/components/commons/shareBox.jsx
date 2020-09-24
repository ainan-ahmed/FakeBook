import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { createPost } from "../../store/posts";
import { connect } from 'react-redux';
import { getAuthUserInfo } from "../../store/users";


class ShareBox extends Component {
  state = {
    data: {
      description: null,
      image: null,
      user: null,
    }
    //showModal: false,
  };
  // handleModalToggle = () => {
  //   const ff = this.state.showModal ? false : true;
  //   this.setState({ showModal: ff });
  // };
  handleDescription = (e) => {
    e.preventDefault();
    let description = e.currentTarget.value
    const data = { ...this.state.data };
    data[e.currentTarget.name] = description;
    this.setState({data})
  }
  handleImageChange = (e) => {
    e.preventDefault();
    console.log(this.props.auth.user.id);
    let reader = new FileReader();
    let image = e.target.files[0];
    const data = { ...this.state.data };
    data["image"] = image;
    reader.onloadend = () => {
      this.setState({
        data,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(image);
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const  data  = { ...this.state.data }
    //console.log(JSON.stringify(this.props.auth.user.id));
    //console.log(data);
    data["user"] = this.props.auth.user.id;
    console.log(data);
    try {
      await this.props.createPost(data)
      toast.success("User updated successfully.");
      this.props.getAuthUserInfo();

    } catch (error) {
      console.log("FAILED");
    }

  }
  render() {
    // const { showModal } = this.state;
    return (
      <React.Fragment>
        <Card>
          <div className="share-content-box w-100 p-2">
            <Form className="share-text-box" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows="6"
                  // className="share-text-field"
                  placeholder="what's on your mind?"
                  id="description"
                  // onClick={this.handleModalToggle}
                  onChange={this.handleDescription}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fa fa-camera" />

                <Form.File
                  label="Add Image"
                  id="custom-file"
                  name="image"
                  onChange={this.handleImageChange}
                  custom
                />
                <img src={this.state.imagePreviewUrl} alt="" className="w-25 h-25" />
              </Form.Group>
              <Button type="submit" variant="primary">Post</Button>
            </Form>
          </div>
        </Card>
        {/* 
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
         */}
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  createPost: (data) => dispatch(createPost(data)),
  getAuthUserInfo: () => dispatch(getAuthUserInfo())
}); 
export default connect(null,mapDispatchToProps)(ShareBox);
