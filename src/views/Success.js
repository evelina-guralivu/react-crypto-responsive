import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "shards-react";

const Success = () => (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
            <Col md={12} style={{marginTop: 150}}>
            <Col sm={{ size: 4, offset: 4 }}>
                <Card small className="mb-4 p-4 justify-content-center">
                <Row>
                    <Col className="justify-content-center">
                       Thank you for completing your purchase! 
                       You are now free to proceed with login.
                    </Col>
                </Row>
                </Card>
            </Col>
            </Col>
           
        </Row>
    </Container>
);

Success.propTypes = {
    /**
     * The small stats dataset.
     */
    smallStats: PropTypes.array
};

Success.defaultProps = {

};

export default Success;