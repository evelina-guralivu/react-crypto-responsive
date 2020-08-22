import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col} from "shards-react";
import PlansCards from "../components/common/PlansCards";

const Prices = () => (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
            <Col md={12} style={{marginTop: 150}}>
                <PlansCards/>
            </Col>
        </Row>
    </Container>
);

Prices.propTypes = {
    /**
     * The small stats dataset.
     */
    smallStats: PropTypes.array
};

Prices.defaultProps = {

};

export default Prices;