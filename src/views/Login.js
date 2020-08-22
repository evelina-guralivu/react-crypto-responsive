import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col} from "shards-react";
import LoginForm from "../components/user-profile-lite/LoginForm";

const Login = () => (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
            <Col md={12} style={{marginTop: 150}}>
            <LoginForm/>
            </Col>
           
        </Row>
    </Container>
);

Login.propTypes = {
    /**
     * The small stats dataset.
     */
    smallStats: PropTypes.array
};

Login.defaultProps = {

};

export default Login;