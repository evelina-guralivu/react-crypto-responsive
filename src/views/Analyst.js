import React from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Container,
  Card,
  Badge,
} from "shards-react";
import ReadMoreReact from 'read-more-react';
import { Redirect } from "react-router-dom";
import FavoritesCard from "../components/common/favorite-card";
import Post from "../components/common/post";
import { getMixedPostsForPublisher, getMemberAlerts, getEducationalPosts, getPublicPostsForPublisher } from "../api";

class Analyst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      alerts: [],
      educationalPosts: [],
    };
  }

  componentDidMount = async () => {
    const profile = JSON.parse(localStorage.getItem("publishers")).filter((p) => {return p.slug === this.props.match.params.id})[0];
    let user = localStorage.getItem("user");
    let posts;
    let alerts; 
    if(user){
      posts = await getMixedPostsForPublisher(profile.id, 3, 0);
      alerts = await getMemberAlerts(profile.id, "*", 3, 0);
    }else{
      posts = await getPublicPostsForPublisher(profile.id, 3, 0);
      alerts = {
        data: []
      }
    }
    const initialFilter = {
      publisherIds: [profile.id],
      tagIds: [],
      educationOnly: true,
      searchString: ""
    }
    let educationalPosts = await getEducationalPosts(initialFilter, 3, 0);
    this.setState({
      posts: posts.data,
      alerts: alerts.data,
      educationalPosts: educationalPosts.data,
    })
  }

  seeAllEducation = (profile) => {
    this.setState({
      redirect: true,
      pathname: '/education',
      state: {
        analyst: profile.id
      }
    })
  }

  seeAllPosts = (profile) => {
    this.setState({
      redirect: true,
      pathname: '/blogs/premium',
      state: {
        analyst: profile.id
      }
    })
  }

  seeAllAlerts = (profile) => {
    this.setState({
      redirect: true,
      pathname: '/alerts',
      state: {
        analyst: profile.id
      }
    })    
  }

  render() {
    let user = localStorage.getItem("user");
    const profile = JSON.parse(localStorage.getItem("publishers")).filter((p) => {return p.slug === this.props.match.params.id})[0];
    return (
      <React.Fragment>
        {this.state.redirect && <Redirect
          to={{
            pathname: this.state.pathname,
            state: this.state.state
          }}
        />}
        <Card className='analyst-card'>
          <Container>
            <Row>
              <Col lg='7'>
                <Row>
                  <Col lg="1" className='photo-top'>
                    <div className="mx-auto">
                      <img
                        className="rounded-circle"
                        src={!!profile && profile.avatar.medium}
                        alt={!!profile && profile.name}
                        width="80"
                      />
                    </div>
                  </Col>
                  <Col lg='4'>
                    <h4>{!!profile && profile.name}</h4>
                    <Badge
                      pill
                      className={`card-post__category badge-content-tag`}
                    >
                      Analyst
                  </Badge>
                  </Col>
                  <Col lg='12'>
                    <div className='analyst-text'>
                      <ReadMoreReact text={!!profile && profile.bio}
                        min={330}
                        ideal={340}
                        max={350}
                        readMoreText='Read more...'/>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col lg='5'>
                <div className='video'>
                {profile && profile.featuredVideo && profile.featuredVideo.mediaId && <div className={"wistia_embed wistia_async_" + profile.featuredVideo.mediaId}></div>}
                </div>
              </Col>
            </Row>
          </Container>
        </Card>
        <Container>
          <Row>
            <Col lg='6' md='12'>
              <FavoritesCard
                loggedIn={false}
                type='posts'
                seeAll={() => this.seeAllPosts(profile)}
                posts={this.state.posts}
              />
            </Col>
            <Col lg='6' md='12'>
              <FavoritesCard
                loggedIn={!user}
                type='alerts'
                seeAll={() => this.seeAllAlerts(profile)}
                posts={this.state.alerts}
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Card className='education-posts'>
            <Row>
              <Col lg='12'>
                <span className='title'>
                  Education
                  <div className='see-all'>
                    <span className='see-all-text'>See All</span>
                    <span className='see-all-btn' onClick={() => this.seeAllEducation(profile)}>+</span>
                  </div>
                </span>
              </Col>
              {this.state.educationalPosts.map((post, idx) => (
                <Post
                  key={idx}
                  col='4'
                  post={post}
                  type='suggested'
                />
              ))}
            </Row>
          </Card>
        </Container>
      </React.Fragment>
    )
  }
};

Analyst.propTypes = {
  userDetails: PropTypes.object,
};

export default Analyst;
