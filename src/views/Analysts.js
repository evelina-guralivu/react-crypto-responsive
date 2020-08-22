/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "shards-react";
import { Link } from 'react-router-dom'; 
import ReadMoreReact from 'read-more-react';

import PageTitle from "../components/common/PageTitle";

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Analysts" subtitle="" className="text-sm-left" />
        </Row>
        <Row>
          {JSON.parse(localStorage.getItem("publishers")).filter(p => p.isFeaturedContributor === false).map((publisher, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post-publisher">
                  <div className="analyst-profile d-flex">
                    <Link
                      to={`/analyst/${publisher.slug}`}
                      className="card-post__author-avatar "
                      style={{ backgroundImage: `url('${publisher.avatar.small}')` }}
                    >
                    </Link>
                    <Link to={`/analyst/${publisher.slug}`}>{publisher.name}</Link>
                  </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href="#" className="text-fiord-blue">
                      {publisher.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">
                    <ReadMoreReact text={publisher.bio}
                        min={330}
                        ideal={340}
                        max={350}
                        readMoreText='Read more...'/>
                  </p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Featured Contributors" subtitle="" className="text-sm-left" />
        </Row>
        <Row>
        {JSON.parse(localStorage.getItem("publishers")).filter(p => p.isFeaturedContributor === true).map((publisher, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post-publisher">
                  <div className="analyst-profile d-flex">
                    <Link
                      to={`/analyst/${publisher.slug}`}
                      className="card-post__author-avatar "
                      style={{ backgroundImage: `url('${publisher.avatar.small}')` }}
                    >
                    </Link>
                    <Link to={`/analyst/${publisher.slug}`}>{publisher.name}</Link>
                  </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href="#" className="text-fiord-blue">
                      {publisher.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">
                  <ReadMoreReact text={publisher.bio}
                        min={330}
                        ideal={340}
                        max={350}
                        readMoreText='Read more...'/>
                  </p>
                </CardBody>
              </Card>
            </Col>
          ))}          
        </Row>
      </Container>
    );
  }
}

export default Education;
