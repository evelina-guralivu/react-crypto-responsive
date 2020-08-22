import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col} from "shards-react";

const Login = () => (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
            <Col md={12} style={{marginTop: 150}}>
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

const style = {
    
}

Login.defaultProps = {

};

export default Login;