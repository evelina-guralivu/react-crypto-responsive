/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col
} from "shards-react";
import PageTitle from "./../components/common/PageTitle";
import Post from "../components/common/post";
import { getPublicPosts } from "../api";

class BlogOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      posts: []
    }
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
      const posts = await getPublicPosts("*", 10, nextPage);
      let temp = this.state.posts;
      let updated = temp.concat(posts.data);
      this.setState({
          posts: updated,
          currentPage: nextPage
      })
    }
  };

  componentDidMount = async () => {
    let user = localStorage.getItem("user");
    document.addEventListener('scroll', this.trackScrolling);
    const posts = await getPublicPosts("*", 10, 0);
    this.setState({
        posts: posts ? posts.data : []
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
          <PageTitle title="Public Blog" subtitle="" className="text-sm-left mb-3" />
        </Row>
        <Row noGutters className="page-header py-4">
          <Col lg='2'>
            <div className='get-discount'>
            </div>
          </Col>
        </Row>
        <Row className="page-header py-4" id={'post-wrapper'}>
          {this.state.posts.map((post, idx) => (
            <Post
              key={idx}
              col={"6"}
              post={post}
            />
          ))}
        </Row>
      </Container>
    );
  }
};


export default BlogOverview;