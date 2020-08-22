import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar, Nav, NavItem, NavLink } from "shards-react";
import { Link } from 'react-router-dom'; 

const SignupNavbar = ({ layout, stickyTop }) => {
  const classes = classNames(
    "main-navbar",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes} style={{ backgroundColor: "white", height: "120px", boxShadow: "none" }}>
      <Container className="p-0">
        <Navbar className="align-items-stretch flex-md-nowrap p-0">
          <Nav navbar className="flex-row">
            <NavItem className="">
              <NavLink className="nav-link-icon" style={{ flexFlow: "row", display: "flex" }}>
                <div>
                <Link to="/">
                  <img
                    id="main-logo"
                    className="mr-1"
                    style={{ maxWidth: "50px", margin: 25 }}
                    src={require("../../../images/bitcoin-live/logo.png")}
                    alt="Bitcoin Live"
                  />
                  </Link>
                </div>
                <div style={{ display: "flex", flexFlow: "column", justifyContent: "center" }}>
                  <div style={{ fontStyle: "normal", fontWeight: "bold", fontSize: "18px", lineHeight: "22px", color: "black" }}>BITCOIN</div>
                  <div style={{ fontStyle: "normal", fontWeight: "bold", fontSize: "14px", lineHeight: "17px", color: "#FAA61A" }}>LIVE</div>
                </div>
              </NavLink>
            </NavItem>
          </Nav>
          <span className="ml-auto my-auto mr-2">
            <Link to="/prices" style={style.link}>Prices</Link>
            <Link to="/public" style={style.link}>Blog</Link>
            <Link to="/login" style={style.login}>Login</Link>
          </span>
        </Navbar>
      </Container>
    </div>
  );
};

const style = {
  link: {
    margin: 25,
    paddingTop: "10px",
    color: "black",
    fontWeight: "500",
    fontSize: "14px"
  },
  login: {
    margin: 25,
    color: "black",
    fontWeight: "500",
    fontSize: "14px",
    border: "1px",
    borderStyle: "solid",
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "5px",
    borderColor: "gray"
  }
}

SignupNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

SignupNavbar.defaultProps = {
  stickyTop: false
};

export default SignupNavbar;
