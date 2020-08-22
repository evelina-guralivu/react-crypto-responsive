/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
} from "shards-react";
import PageTitle from "./../components/common/PageTitle";
import Post from "../components/common/post";
import { getEducationalPosts } from "../api";

class SearchResults extends React.Component {
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
    const {state} = this.props.location;
    let term = '';
    if(state){
      term = state.term;
    }
    let filter = {
      "publisherIds": [],
      "educationOnly": false,
      "searchString": term,
      "applySearchStringTo": {
        "title": true,
        "content": false,
        "excerpt": false,
        "tags": false
      }
    }
    const wrappedElement = document.getElementById('post-wrapper');
    if (this.isBottom(wrappedElement)) {
      let nextPage = this.state.currentPage + 1;
      const posts = await getEducationalPosts(filter, 10, nextPage);
      let temp = this.state.posts;
      let updated = temp.concat(posts.data);
      this.setState({
          posts: updated,
          currentPage: nextPage
      })
    }
  };

  componentDidMount = async () => {
    const {state} = this.props.location;
    let term = '';
    if(state){
      term = state.term;
    }
    let filter = {
      "publisherIds":[],
      "educationOnly": false,
      "searchString": term,
      "applySearchStringTo": {
        "title": true,
        "content": false,
        "excerpt": false,
        "tags": false
      }
    }
    let user = localStorage.getItem("user");
    document.addEventListener('scroll', this.trackScrolling);
    const posts = await getEducationalPosts(filter, 10, 0);
    this.setState({
        posts: posts ? posts.data : []
    })
  }

  render() {
    const {state} = this.props.location;
    let term = '';
    if(state){
      term = state.term;
    }
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title={`Search Results for: ${term}`} subtitle="" className="text-sm-left mb-3" />
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


export default SearchResults;