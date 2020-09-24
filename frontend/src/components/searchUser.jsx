import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { search_user } from "../store/endpoints";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../store/users";
const queryString = require("query-string");
class SearchUser extends Component {
  state = {
    data: null,
    query: queryString.parse(this.props.location.search).q,
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
    // console.log(query);
    // //let query = queryString.parse(this.props.location.search).q;
    // if (query === "") query = null;
    // let searchQuery = query;
    // console.log(data);
    // console.log(query);
    // console.log(searchQuery);
    // if (query) this.handleQuery(query);
    return (
      <Container className="mt-5">
        {!data && (
          <h1 className="text-center font-weight-bold">Search For User</h1>
        )}
        {query && (
          <h1 className="text center mb-4">
            Search Result for
            <span className="text-success font-weight-bold">  "{query}"</span>
          </h1>
        )}
        {data && !data.length && (
          <h3 className="text-danger font-weight-bold"> No user found</h3>
        )}
        {data &&
          data.length > 0 &&
          data.map((i) => (
            <li key={i.username}>
              <Link to={{ pathname: "/" + i.username }}>
                {i.first_name} {i.last_name}
              </Link>
            </li>
          ))}
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getUser: (username) => dispatch(getUser(username)),
});
export default connect(null, mapDispatchToProps)(SearchUser);
