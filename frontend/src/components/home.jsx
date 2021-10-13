import React, { Component } from 'react';
import { Row,Col } from 'react-bootstrap';
import ProfileMenu from './commons/profileMenu';
import { connect } from 'react-redux';

 
class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <Row>
                <Col md={2}> 
                </Col>
                <Col md={8}>
                </Col>
                <Col md={2}></Col>
            </Row>
         );
    }
}
 
const mapStateToProps = (state) => ({
  auth: state.auth,
});
// const mapDispatchToProps = (dispatch) => ({
//   getUserDetails: (username) => dispatch(getUserDetails(username)),
// });
export default connect(mapStateToProps, null)(Home);
