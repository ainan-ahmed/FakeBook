import React, { Component } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";
import { search_user } from "../store/endpoints";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDetails } from "../store/users";
const queryString = require("query-string");
class SearchUser extends Component {
  state = {
    data: null,
  };
  handleQuery = async (query) => {
    const response = await axios.get(search_user, {
      params: { search: query },
    });
    console.log(response.data);
    // if (response.data.length) {
    //console.log("paisi");
    this.setState({ data: response.data });
    // }
    //this.setState({ query: null });
  };
  componentDidMount() {
    let query = queryString.parse(this.props.location.search).q;
    if (query === "") query = null;
    this.setState({ query });
    if (query) this.handleQuery(query);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search !== prevProps.location.search) {
      let query = queryString.parse(this.props.location.search).q;
      if (query === "") query = null;
      this.setState({ query });
      if (query) this.handleQuery(query);
    }
  }
  render() {
    let { data, query } = this.state;
    console.log(data);
    const {auth} = this.props
    console.log(this.props);
    return (
      <Container className="mt-5">
        {!data && (
          <h1 className="text-center font-weight-bold">Search For User</h1>
        )}
        {query && (
          <h1 className="text center mb-4">
            Search Result for
            <span className="text-success font-weight-bold"> "{query}"</span>
          </h1>
        )}
        {data && !data.length && (
          <h3 className="text-danger font-weight-bold"> No user found</h3>
        )}
        {data &&
          data.length > 0 &&
          data.map((i) => (

            <Row>
              <Card
                border="success"
                style={{ width: "50rem" }}
                className="mt-3"
              >
                <Card.Title className="p-2">
                  {/* <li key={i.username}> */}
                    {i.username !== auth.user.username &&
                    
                  <div className="">
                  <Link to={{ pathname: "/" + i.username }} className="ml-5">
                    <Card.Img
                      variant="top"
                      src={i.profile_photo}
                      alt="profile picture"
                      className="w-25 float-start"
                      style={{ height: "100%", width: "auto" }}
                      fluid
                      roundedCircle
                    />
                  </Link>
                  <Link
                    to={{ pathname: "/" + i.username }}
                    className="ml-4 ms-5 pt-5"
                  >
                    {i.first_name} {i.last_name}
                    </Link>
                </div>
                  }
                    {i.username === auth.user.username &&
                    
                  <div className="">
                  <Link to={{ pathname: "/auth/" + i.username }} className="ml-5">
                    <Card.Img
                      variant="top"
                      src={i.profile_photo}
                      alt="profile picture"
                      className="w-25 float-start"
                      style={{ height: "100%", width: "auto" }}
                      fluid
                      roundedCircle
                    />
                  </Link>
                  <Link
                    to={{ pathname: "/auth/" + i.username }}
                    className="ml-4 ms-5 pt-5"
                  >
                    {i.first_name} {i.last_name}
                    </Link>
                </div>
                  }
                  {/* </li> */}
                </Card.Title>
                <Card.Text>
                  {i.city && <p className="ml-5">Lives in {i.city}</p>}
                </Card.Text>
              </Card>
            </Row>
          ))}
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  getUserDetails: (username) => dispatch(getUserDetails(username)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
