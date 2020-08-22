import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import { Link } from "react-router-dom";
import LandingNavbar from "../components/layout/LandingNavbar/LandingNavbar";
import MainFooter from "../components/layout/MainFooter";

import "../assets/styles/landing.scss";

const LandingLayout = ({ children, noNavbar, noFooter }) => (
  <div className="container-fluid px-0">
    <div className="landing-top">
      {!noNavbar && <LandingNavbar />}
      <div className="row mt-5">
        <div className="col-sm-6">
          <div className="d-flex justify-content-center">
            <div>
              <div className="ml-3">
                <h5 style={style.title}>
                  Take Your Crypto Trading To The{" "}
                  <span style={style.titleHighlighted}>Next</span>
                </h5>
                <h5 style={style.title}>
                  <span style={style.titleHighlighted}>Level</span>
                </h5>
              </div>
              <br />
              <ul>
                <li style={style.bullet}>
                  Learn From Our World Class Crypto Traders
                </li>
                <li style={style.bullet}>
                  Get insider secrets and tips every month
                </li>
                <li style={style.bullet}>
                  Attend live events with the world’s top traders
                </li>
                <li style={style.bullet}>Get real time trade alerts</li>
              </ul>
              <div className="mt-4">
                <Link
                  to={"/prices"}
                  className="bitcoin-linear"
                  style={style.defaultLink}
                >
                  Become A Member
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 landing-image mb-4"></div>
      </div>
    </div>

    {children}
    {!noFooter && <MainFooter />}
  </div>
);

const style = {
  title: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: "40px",
    fontHeight: "52px",
    color: "white",
    lineHeight: "60px",
  },
  titleHighlighted: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: "40px",
    fontHeight: "52px",
    color: "#FAA713",
    lineHeight: "60px",
  },
  bullet: {
    color: "white",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: "16px",
    fontHeight: "19px",
    marginBottom: "20px",
  },
  defaultBtn: {
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 25,
    marginTop: 56,
    paddingTop: 10,
    paddingBottom: 16,
    fontSize: 16,
    lineHeight: "28px",
    border: "none",
  },
  defaultLink: {
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 25,
    marginTop: 56,
    paddingTop: 10,
    paddingBottom: 16,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 16,
    lineHeight: "28px",
    border: "none",
    color: "white",
    textAlign: "center",
  },
};

LandingLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
};

LandingLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default LandingLayout;
