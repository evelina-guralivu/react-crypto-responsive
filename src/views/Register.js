import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col} from "shards-react";
import RegisterForm from "../components/user-profile-lite/RegisterForm";

const Register = () => (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
            <Col sm={{ size: 6, offset: 3 }}  style={{marginTop: 50}}><h4>Registration</h4></Col>
            <Col md={12} style={{marginTop: 50}}>
            <RegisterForm/>
            </Col>
        </Row>
    </Container>
);

Register.propTypes = {
    smallStats: PropTypes.array
};

Register.defaultProps = {

};

export default Register;