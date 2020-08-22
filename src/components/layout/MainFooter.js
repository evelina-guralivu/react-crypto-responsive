import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";

const MainFooter = ({ contained, menuItems }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white" style={{minHeight: 130, marginTop: 50}}>
    <Container fluid={contained}>
      <Row style={{alignItems: "center", height: "100%"}}>
        <img
              id="main-logo"
              style={{ maxWidth: "50px", margin: "30px"}}
              src={require("../../images/bitcoin-live/logo.png")}
              alt="Bitcoin Live"
          />
         <div style={{color: "#9292A6"}}>© 2020, Bitcoin.live</div>
        <Nav style={{marginLeft: "auto",}}>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <NavLink tag={Link} to={item.to} style={{ color: "#9292A6", fontSize: "14px", lineHeight: "16px", fontWeight: "normal"}}>
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">
       {/*<i className="fab fa-facebook-square" style={{fontSize: "22px", margin: 24}}></i> */}
        <i className="fab fa-twitter-square" style={{fontSize: "22px", margin: 24}}></i>
       {/*  <i className="fab fa-instagram" style={{fontSize: "22px", margin: 24}}></i>*/}
        </span>
      </Row>
    </Container>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  menuItems: [
    {
      title: "Terms & Conditions",
      to: "terms&conditions"
    },
    {
      title: "Privacy Policy",
      to: "policy"
    },
  ]
};

export default MainFooter;
