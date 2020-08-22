import React from "react";
import { Container } from "shards-react";

const Errors = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>404</h2>
        <h3>Page not found</h3>
        <p>The page you are looking for was not found.. Please try again later.</p>
      </div>
    </div>
  </Container>
);

export default Errors;
