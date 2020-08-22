import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import SignupNavbar from "../components/layout/SignupNavbar/SignupNavbar";

const SignupLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
    <Row>
      <Col
        className="main-content p-0"
        lg={{ size: 12 }}
        md={{ size: 12 }}
        sm="12"
        tag="main"
      >
        <Col className="landing-top">
          {!noNavbar && <SignupNavbar />}
          <Row>
          </Row>
        </Col>
        {children}
        {/**!noFooter && <MainFooter /> **/}
      </Col>
    </Row>
  </Container>
);

SignupLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

SignupLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default SignupLayout;
