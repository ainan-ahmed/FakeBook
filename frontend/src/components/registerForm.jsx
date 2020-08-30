import React from "react";
import baseForm from "./commons/form";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { register } from "../store/users";
import { Form, Button, Alert } from "react-bootstrap";

class RegisterForm extends baseForm {
  state = {
    startDate: new Date(),
    data: {
      email: "",
      date_of_birth: "",
      first_name: "",
      last_name: "",
      password: "",
      password2: "",
      gender: "",
    },
    errors: {},
  };
  schema = {
    email: Joi.string().required().email().label("Email"),
    first_name: Joi.string().required().label("First name"),
    last_name: Joi.string().required().label("Last name"),
    date_of_birth: Joi.string().required().label("Date of birth"),
    gender: Joi.string().required().label("Gender"),
    password: Joi.string().required().min(6).label("Password"),
    password2: Joi.string()
      .required()
      .min(6)
      .valid(Joi.ref("password"))
      .options({ language: { any: { allowOnly: "password do not match" } } })
      .label("Password"),
  };

  submitToServer = async () => {
    //call the server
    console.log(this.state.data);
    const {
      email,
      first_name,
      last_name,
      password,
      password2,
      date_of_birth,
      gender,
    } = this.state.data;
    try {
      await this.props.register(
        email,
        first_name,
        last_name,
        password,
        password2,
        date_of_birth,
        gender
      );
      //localStorage.setItem("token", token["key"]);
      //window.location = "/";
      this.props.history.push("/");
    } catch (error) {
      let errors = { ...this.state.errors };
      const serverError = error.response.data;
      errors.email = serverError["email"];
      errors.first_name = serverError["first_name"];
      errors.last_name = serverError["last_name"];
      errors.date_of_birth = serverError["date_of_birth"];
      errors.password = serverError["password"];
      errors.password2 = serverError["password2"];
      this.setState({ errors });
      console.log(this.state.errors);
    }
    //console.log("submitted");
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div className="mt-5">
        <h1>Register</h1>
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
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="first_name"
              placeholder="Enter first_name"
              name="first_name"
              value={data.first_name}
              onChange={this.handleChange}
            />
            {errors.first_name && (
              <Alert variant={"danger"}>{errors.first_name}</Alert>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="last_name"
              placeholder="Enter last_name"
              name="last_name"
              value={data.last_name}
              onChange={this.handleChange}
            />
            {errors.last_name && (
              <Alert variant={"danger"}>{errors.last_name}</Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              onChange={this.handleChange}
            >
              <option hidden>Please Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
            {errors.gender && <Alert variant={"danger"}>{errors.gender}</Alert>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" name="date_of_birth" onChange={this.handleChange}/>
            {errors.date_of_birth && (
              <Alert variant={"danger"}>{errors.date_of_birth}</Alert>
            )}
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
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repeat Password"
              name="password2"
              onChange={this.handleChange}
            />
            {errors.password2 && (
              <Alert variant={"danger"}>{errors.password2}</Alert>
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
  register: (
    email,
    first_name,
    last_name,
    password,
    password2,
    date_of_birth,
    gender
  ) =>
    dispatch(
      register(
        email,
        first_name,
        last_name,
        password,
        password2,
        date_of_birth,
        gender
      )
    ),
});
export default connect(null, mapDispatchToProps)(RegisterForm);
