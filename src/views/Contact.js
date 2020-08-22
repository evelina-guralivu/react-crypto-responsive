/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col
} from "shards-react";

import ContactForm from "../components/contact/ContactForm";
import PageTitle from "../components/common/PageTitle";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Support" subtitle="Contact" className="text-sm-left" />
        </Row>
        <Row>
          <Col md={{size: 12}}>
          <ContactForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Contact;
