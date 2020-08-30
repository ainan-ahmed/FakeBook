import React from "react";
import Joi from "joi-browser";
import baseForm from "./commons/form";
import { Form, Button, Alert } from "react-bootstrap";
import { login } from "../store/users";
import { connect } from "react-redux";

class LoginForm extends baseForm {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };
  submitToServer = async () => {
    try {
      const { email, password } = this.state.data;
      await this.props.login(email, password);
      //console.log(this.props);
      this.props.history.push("/");
      //const { state } = this.props.location;
      //window.location = state ? state.from.pathname : "/";
      console.log("logged in");
    } catch (error) {
      console.log("asdfsdaf   ->"+error); 
      if (error.response) {
        console.log("serverError");

        let errors = { ...this.state.errors };
        const serverError = error.response.data;
        console.log(serverError);
        errors.email = serverError["email"];
        errors.password = serverError["password"];
        this.setState({ errors });
        console.log(this.state.errors);
      }
    }
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div className="mt-5">
        <h1>Login Form</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              autoFocus
              value={data.email}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            {errors.email && <Alert variant={"danger"}>{errors.email}</Alert>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            {errors.password && (
              <Alert variant={"danger"}>{errors.password}</Alert>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password))
});
export default connect(null, mapDispatchToProps)(LoginForm);
