import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col} from "shards-react";
import ForgotForm from "../components/user-profile-lite/ForgotForm";

const Login = () => (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
            <Col md={12} style={{marginTop: 150}}>
            <ForgotForm/>
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