import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import PlansCards from "../components/common/PlansCards";

const Landing = () => (
  <div className="container">
    <div style={{ backgroundColor: "white" }}>
      <Row
        style={{
          marginLeft: "10%",
          marginRight: "10%",
          minHeight: "339px",
          top: "-123px",
          backgroundColor: "white",
          borderRadius: "5px",
          position: "relative",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 3px 30px 2px rgba(120, 120, 120, .3)",
        }}
      >
        <h3
          style={{
            marginTop: "20px",
            marginBottom: "40px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "44px",
            color: "#29293A",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          Learn from Our World Class Traders
        </h3>
        <Row
          style={{ justifyContent: "center", width: "100%" }}
          className="mb-4"
        >
          <Col md={{ size: 2 }}>
            <div className="d-flex justify-content-center">
              <img
                className="user-avatar rounded-circle mr-2"
                src={require("./../images/avatars/peter.png")}
                alt="User Avatar"
                style={{ maxWidth: "100%", margin: 15 }}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Peter Brandt
            </div>
          </Col>
          <Col md={{ size: 2 }}>
            <div className="d-flex justify-content-center">
              <img
                className="user-avatar rounded-circle mr-2"
                src={require("./../images/avatars/bob.png")}
                alt="User Avatar"
                style={{ maxWidth: "100%", margin: 15 }}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Bob Loukas
            </div>
          </Col>
          <Col md={{ size: 2 }}>
            <div className="d-flex justify-content-center">
              <img
                className="user-avatar rounded-circle mr-2"
                src={require("./../images/avatars/c.png")}
                alt="User Avatar"
                style={{ maxWidth: "100%", margin: 15 }}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              C The Light
            </div>
          </Col>
          <Col md={{ size: 2 }}>
            <div className="d-flex justify-content-center">
              <img
                className="user-avatar rounded-circle mr-2"
                src={require("./../images/avatars/mark.png")}
                alt="User Avatar"
                style={{ maxWidth: "100%", margin: 15 }}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Mark Dukas
            </div>
          </Col>
          <Col md={{ size: 2 }}>
            <div className="d-flex justify-content-center">
              <img
                className="user-avatar rounded-circle mr-2"
                src={require("./../images/avatars/big.png")}
                alt="User Avatar"
                style={{ maxWidth: "100%", margin: 15 }}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Big Cheds
            </div>
          </Col>
        </Row>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col sm={{ size: 5, offset: 1 }}>
          <div className={"wistia_embed wistia_async_bx2jmnrzy3"}></div>
        </Col>
        <Col sm={{ size: 5 }} className="mx-3">
          <h5 style={style.title}>
            Bitcoin Live: Transform Your Passion Into Trading Profits
          </h5>
          <br />
          <p>
            New to cryptocurrency or trading? Or already in the game but want to
            know how to transform your passion into greater success and results?
            No worries, Bitcoin Live is here to help you take your crypto
            trading to the next level with a host of features, services, and
            resources, including:
          </p>
          <ul>
            <li>Real-Time Trade Alert Ideas</li>
            <li>Technical Analysis Training</li>
            <li>Live Events with World’s Leading Crypto Traders</li>
            <li>Intuitive Learning Platform</li>
            <li>Chats, Alerts, Webinars, and Reports</li>
          </ul>
        </Col>
      </Row>
    </div>
    <div
      style={{
        backgroundColor: "#FBFBFD",
        paddingTop: "50px",
      }}
      className="px-3"
    >
      <h5
        style={{
          color: "#FAA713",
          fontSize: 14,
          fontStyle: "normal",
          textTransform: "uppercase",
        }}
      >
        Get to Know Our Analysts
      </h5>
      <h5 style={style.title}>
        See How They Can Help You Master Crypto Trading
      </h5>
      <br />
      <Row style={{ minHeight: 250 }} className={"trader-videos"}>
        <Col sm={{ size: 4 }}>
          <div className={"wistia_embed wistia_async_bx2jmnrzy3"}></div>
          Peter Brandt Bitcoin Live Webinar
        </Col>
        <Col sm={{ size: 4 }}>
          <div className={"wistia_embed wistia_async_bx2jmnrzy3"}></div>
          Haejin Lee Webinar
        </Col>
        <Col sm={{ size: 4 }}>
          <div className={"wistia_embed wistia_async_bx2jmnrzy3"}></div>
          Bob Loukas Bitcoin Live Webinar
        </Col>
      </Row>
    </div>

    <div
      style={{
        backgroundColor: "white",

        paddingBottom: "100px",
        paddingTop: "50px",
      }}
      className="px-3"
    >
      <h5
        style={{
          color: "#FAA713",
          fontSize: 14,
          fontStyle: "normal",
          textTransform: "uppercase",
        }}
      >
        Crypto is the future
      </h5>
      <h5 style={style.title}>
        Bitcoin Live Is the Key to Your Future Success
      </h5>
      <br />
      <Row style={{ minHeight: 250 }}>
        <Col sm={{ size: 6 }}>
          <div style={{ height: "100%" }}>
            <Row style={style.row}>
              <p style={style.para}>
                The future is already here and Crypto will do for money what the
                Internet has already done for communication. Why waste your time
                on outdated “Crypto Training” courses from people no longer even
                in the game? At Bitcoin Live, you can learn from the world’s
                leading crypto traders and gain access to the most advanced
                training materials on the market today.
              </p>
              <br />
            </Row>
            <Row style={style.row}>
              <div style={style.tab}>
                <i className="fa fa-book" style={style.roundIcon}></i>
                <div style={{ display: "inline-flex" }}>
                  Up-to-Date Interactive Training Materials
                </div>
              </div>
            </Row>
            <Row style={style.row}>
              <div style={style.tab}>
                <i className="fa fa-globe" style={style.roundIcon}></i>
                <div style={{ display: "inline-flex" }}>
                  Expert Analysis and Advice from World’s Top Crypto Traders
                </div>
              </div>
            </Row>
            <Row style={style.row}>
              <div style={style.tab}>
                <i className="fa fa-clock" style={style.roundIcon}></i>
                <div style={{ display: "inline-flex" }}>
                  Learn 24/7 At Your Own Pace
                </div>
              </div>
            </Row>
          </div>
        </Col>
        <Col sm={{ size: 6 }}>
          <div style={{ height: "100%" }}>
            <Row style={style.row}>
              <div style={style.tab}>
                <i className="fa fa-database" style={style.roundIcon}></i>
                <div style={{ display: "inline-flex" }}>
                  New Blogs, Videos and Materials Added Every Day
                </div>
              </div>
            </Row>
            <Row style={style.row}>
              <div style={style.tab}>
                <i className="fa fa-user" style={style.roundIcon}></i>
                <div style={{ display: "inline-flex" }}>
                  Join Our Growing Community for Support, Opportunities and More
                </div>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "200px", overflow: "hidden" }}>
        <Col sm={{ size: 5 }}>
          <h5 style={style.title}>
            About Our Thriving Community of Crypto Traders
          </h5>
          <br />
          <p>
            Bitcoin Live was founded for one simple reason: All of the existing
            training materials on Crypto Trading were outdated, inaccurate, or
            just plain useless. Cryptocurrency is on the leading edge of
            technology and commerce so you need to learn from the people who are
            on top of their game NOW. Our focus is to provide members with
            access to the most advanced, up-to-date training materials,
            webinars, live events, and information so they can learn and master
            crypto trading just like the pros. Plus, our growing and diverse
            community allows you to connect with others so you can learn and
            prosper together. Access all training materials, live events,
            videos, blogs and more via our secure All-In-One Platform:{" "}
          </p>
        </Col>
        <Col sm={{ size: 5 }}>
          <div>
            <img
              className="mr-1"
              style={{ maxWidth: "1250px", marginTop: "4%" }}
              src={require("../images/bitcoin-live/platform.png")}
              alt="Bitcoin Live"
            />
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "200px" }}>
        <Col sm={{ size: 6 }}>
          <div className="mr-1 img-leading-crypto" alt="Bitcoin Live"></div>
        </Col>
        <Col sm={{ size: 5, offset: 1 }}>
          <h5 style={style.title}>Learn from Leading Crypto Traders</h5>
          <br />
          <p>
            We have 6 of the world’s leading Crypto traders who share their
            proven investment strategies and advice via live events, webinars,
            blogs, and other training materials. At Bitcoin Live, our crypto
            trading experts are all at the top of their game and sharing their
            latest strategies for success. Plus, all of our training materials
            are constantly updated to ensure you are getting the latest, most
            accurate information in the world of crypto trading.
          </p>
        </Col>
      </Row>
      <Row style={{ marginTop: "200px" }}>
        <Col sm={{ size: 6 }}>
          <h5 style={style.title}>All-In-One Crypto Training “Supertool”</h5>
          <br />
          <p>
            From the moment you join Bitcoin Live, you gain access to all of our
            videos, posts, blogs, webinars and training materials. Plus, all
            members have full access to all live events hosted by the world’s
            leading crypto traders for the latest and greatest strategies for
            crypto trading success.{" "}
          </p>
        </Col>
        <Col sm={{ size: 5, offset: 1 }}>
          <div className="img-crypto-traning" alt="Bitcoin Live"></div>
        </Col>
      </Row>
      <Row style={{ marginTop: "200px" }}>
        <Col sm={{ size: 6 }}>
          <div className="img-community" alt="Bitcoin Live"></div>
        </Col>
        <Col sm={{ size: 5, offset: 1 }}>
          <h5 style={style.title}>
            Join a Community of Like-Minded Entrepreneurs
          </h5>
          <br />
          <p>
            Bitcoin Live is much more than a training platform, it’s a full
            community of like-minded entrepreneurs sharing ideas and a passion
            for success. From newbie to successful investor, we’re here with you
            every step of the way.
          </p>
        </Col>
      </Row>
    </div>

    <div
      style={{
        backgroundColor: "#FBFBFD",
        paddingTop: "5%",
      }}
      className="px-3"
    >
      <Row>
        <Col sm={{ size: 5 }}>
          <h5
            style={{
              color: "#FAA713",
              fontSize: 14,
              fontStyle: "normal",
              textTransform: "uppercase",
            }}
          >
            Get to Know Our Analysts
          </h5>
          <h5 style={style.title}>1% of all sales support Bitcoin!</h5>
          <p>
            Join us in promoting Bitcoin and Cryptocurrencies. 1% of all sales
            go directly to our community's choice of the most impactful Bitcoin
            and Cryptocurrency developers. Together we will honor and reward
            those who make a difference.
          </p>
        </Col>
        <Col sm={{ size: 5, offset: 2 }}>
          <img
            className="mr-1"
            style={{ maxWidth: "100%" }}
            src={require("../images/bitcoin-live/bitcoin.png")}
            alt="Bitcoin Live"
          />
        </Col>
      </Row>
      <PlansCards />
    </div>
  </div>
);

Landing.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array,
};

const style = {
  title: {
    fontWeight: 500,
    fontSize: "32px",
    fontHeight: "44px",
    color: "#29293A",
    paddingTop: 24,
    lineHeight: "45px",
    paddingBottom: 70,
  },
  row: {
    marginRight: 0,
    marginLeft: 0,
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
  para: {
    fontWeight: "normal",
    fontSize: "16px",
    fontHeight: "30px",
    color: "#29293A",
  },
  tab: {
    backgroundColor: "#FBFBFD",
    height: 100,
    width: "100%",
    borderRadius: "10px",
    marginBottom: 30,
    display: "flex",
    alignItems: "center",
  },
  roundIcon: {
    borderRadius: 60,
    backgroundColor: "#faf2e5",
    color: "#FAA713",
    fontSize: 20,
    marginLeft: 24,
    marginRight: 24,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 56,
    minWidth: 56,
  },
};

Landing.defaultProps = {};

export default Landing;
