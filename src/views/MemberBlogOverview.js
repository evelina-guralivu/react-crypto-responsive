/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
} from "shards-react";
import { Button } from "reactstrap";
import PageTitle from "./../components/common/PageTitle";
import Post from "../components/common/post";
import { getEducationalPosts } from "../api";
import LoadingOverlay from 'react-loading-overlay';

class MemberBlogOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: JSON.parse(localStorage.getItem("user")),
      session: JSON.parse(localStorage.getItem("session")),
      currentPage: 0,
      posts: [],
      isLoading: true,
      publishersSelected: [],
    };
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = async () => {
    const wrappedElement = document.getElementById('post-wrapper');
    if (this.isBottom(wrappedElement)) {
      let nextPage = this.state.currentPage + 1;
      const filter = {
        publisherIds: this.state.publishersSelected,
        tagIds: [],
        educationOnly: false,
      }
      const posts = await getEducationalPosts(filter, 10, nextPage);
      let temp = this.state.posts;
      let updated = temp.concat(posts.data);
      this.setState({
          posts: updated,
          currentPage: nextPage
      })
    }
  };

  clearFilters = () => {
    this.setState({
      publishersSelected: [],
      currentPage: 0,
    }, () => {
      this.fetchPosts(0);
    })
  }

  selectPublisher = (event, id) => {
    this.setState({
      currentPage: 0,
    })
    if(this.state.publishersSelected.includes(id)){
      let temp = this.state.publishersSelected;
      const index = temp.indexOf(id);
      temp.splice(index, 1);
      this.setState({publishersSelected: temp});
    }else{
      let temp = this.state.publishersSelected;
      temp.push(id);
      this.setState({publishersSelected: temp});
    }
    this.fetchPosts(0);
  }

  fetchPosts = async (page) => {
      const filter = {
        publisherIds: this.state.publishersSelected,
        tagIds: [],
        educationOnly: false,
      }
      const posts = await getEducationalPosts(filter, 10, page);
      this.setState({
          posts: posts.data,
          currentPage: page
    })
  }

  componentDidMount = async () => {
    let user = localStorage.getItem("user");
    document.addEventListener('scroll', this.trackScrolling);
    const filter = {
      publisherIds: [],
      tagIds: [],
      educationOnly: false,
    }
    if(this.props.location.state){
      let analystId = this.props.location.state.analyst;
      filter.publisherIds = [analystId];
      let temp = this.state.publishersSelected;
      temp.push(analystId);
      this.setState({publishersSelected: temp});
    }
    const posts = await getEducationalPosts(filter, 10, 0);
    this.setState({
        posts: posts ? posts.data : [],
    })
    if(!user){
      const script = document.createElement('script');
      script.src = "https://app.getresponse.com/view_webform_v2.js?u=SYHN&webforms_id=SSep1";
      script.async = true;
      document.getElementsByClassName("get-discount")[0].appendChild(script);
    }
  }


  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Member Content" subtitle="" className="text-sm-left mb-3" />
        </Row>
        <Row noGutters className="page-header py-4">
          <Col lg='2'>
            <div className='get-discount'>
            </div>
          </Col>
          <Col lg='10'>
            <div className='filters text-right'>
            {localStorage.getItem("publishers") && JSON.parse(localStorage.getItem("publishers")).map((publisher, idx) => (
                <a
                  href="#"
                  key={idx}
                  className={this.state.publishersSelected.includes(publisher.id) ? 'selected card-post__author-avatar card-post__author-avatar--small' : 'card-post__author-avatar card-post__author-avatar--small'}
                  onClick={e => this.selectPublisher(e, publisher.id)}
                >
                  <img src={publisher.avatar.small} alt={publisher.name} />
                </a>
              ))}
              <div className='button-wrapper'>
                <Button
                  theme="accent"
                  className='cancel'
                  onClick={this.clearFilters}
                >
                  Clear all filters
              </Button>
              </div>
            </div>
            
          </Col>
        </Row>
        <Row id={'post-wrapper'}>
         
          {this.state.posts.map((post, idx) => (
            <Post
              key={idx}
              col={"6"}
              post={post}
            />
          ))}
          
        </Row>
      </Container>
    )
  }
};

export default MemberBlogOverview;