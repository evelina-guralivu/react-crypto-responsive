import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// import { Container, Navbar, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

// const LandingNavbar = ({ layout, stickyTop }) => {
// const classes = classNames("main-navbar", stickyTop && "sticky-top");

import "../../../assets/styles/styles.scss";

const LandingNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    // <nav className="navbar navbar-expand-md bg-dark navbar-dark">
    //   <a className="navbar-brand" href="#">
    //     Navbar
    //   </a>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#collapsibleNavbar"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="collapsibleNavbar">
    //     <ul className="navbar-nav">
    //       <li className="nav-item">
    //         <a className="nav-link" href="#">
    //           Link
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="#">
    //           Link
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="#">
    //           Link
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
    // <div
    //   className={classes}
    //   style={{
    //     backgroundColor: "transparent",
    //     height: "80px",
    //     boxShadow: "none",
    //   }}
    // >
    //   <Container className="p-0">
    //     <Navbar className="align-items-stretch flex-md-nowrap p-0">
    //       <Nav navbar className="flex-row">
    //         <NavItem className="">
    //           <NavLink
    //             className="nav-link-icon"
    //             style={{ flexFlow: "row", display: "flex" }}
    //           >
    //             <div>
    //               <Link to="/">
    //                 <img
    //                   id="main-logo"
    //                   className="mr-1"
    //                   style={{ maxWidth: "50px", margin: 25 }}
    //                   src={require("../../../images/bitcoin-live/logo.png")}
    //                   alt="Bitcoin Live"
    //                 />
    //               </Link>
    //             </div>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 flexFlow: "column",
    //                 justifyContent: "center",
    //               }}
    //             >
    //               <div
    //                 style={{
    //                   fontStyle: "normal",
    //                   fontWeight: "bold",
    //                   fontSize: "18px",
    //                   lineHeight: "22px",
    //                   color: "white",
    //                 }}
    //               >
    //                 BITCOIN
    //               </div>
    //               <div
    //                 style={{
    //                   fontStyle: "normal",
    //                   fontWeight: "bold",
    //                   fontSize: "14px",
    //                   lineHeight: "17px",
    //                   color: "#FAA61A",
    //                 }}
    //               >
    //                 LIVE
    //               </div>
    //             </div>
    //           </NavLink>
    //         </NavItem>
    //       </Nav>
    //       <span className="ml-auto my-auto mr-2">
    //         {/* <div className="collapse navbar-collapse" id="collapsibleNavbar"> */}
    //         <Link to="/prices" style={style.link}>
    //           Prices
    //         </Link>
    //         <Link to="/public" style={style.link}>
    //           Blog
    //         </Link>
    //         <Link to="/login" style={style.login}>
    //           Login
    //         </Link>
    //         {/* </div> */}
    //       </span>
    //     </Navbar>
    //   </Container>
    // </div>

    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <div className="row">
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
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "18px",
                  lineHeight: "22px",
                  color: "white",
                }}
              >
                BITCOIN
              </div>
              <div
                style={{
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#FAA61A",
                }}
              >
                LIVE
              </div>
            </div>
          </div>
          <button
            className="navbar-toggler float-right custom-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar9"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbar9">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <a className="nav-link c-nav-item" href="/prices">
                  Prices
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link c-nav-item" href="/public">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link c-nav-item c-nav-item-login"
                  href="/login"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <Navbar expand="md" className="">
        <NavbarBrand href="/">
          <div className="row">
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
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "18px",
                  lineHeight: "22px",
                  color: "white",
                }}
              >
                BITCOIN
              </div>
              <div
                style={{
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#FAA61A",
                }}
              >
                LIVE
              </div>
            </div>
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="custom-toggler" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <span className="ml-auto my-auto mr-2">
              <Link to="/prices" style={style.link}>
                Prices
              </Link>
              <Link to="/public" style={style.link}>
                Blog
              </Link>
              <Link to="/login" style={style.login}>
                Login
              </Link>
            </span>
          </Nav>
        </Collapse>
      </Navbar>
    
    
     */}
    </div>
  );
};

const style = {
  link: {
    margin: 25,
    paddingTop: "10px",
    color: "white",
    fontWeight: "500",
    fontSize: "14px",
  },
  login: {
    margin: 25,
    color: "white",
    fontWeight: "500",
    fontSize: "14px",
    border: "1px",
    borderStyle: "solid",
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "5px",
    borderColor: "gray",
  },
};

LandingNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool,
};

LandingNavbar.defaultProps = {
  stickyTop: false,
};

export default LandingNavbar;
