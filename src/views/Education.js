import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
} from "shards-react";
import PageTitle from "./../components/common/PageTitle";
import { getAllEductionTopics, getEducationalPosts } from "../api";
import Post from "../components/common/post";

class Education extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      topicsSelected: [],
      publishersSelected: [],
      posts: [],
      currentPage: 0,
    };
  }

  componentDidMount = async () => {
    let user = localStorage.getItem("user");
    document.addEventListener('scroll', this.trackScrolling);
    const publishers = JSON.parse(localStorage.getItem("publishers"));
    const topics = await getAllEductionTopics();
    this.setState({topics: topics ? topics.data : []});
    const initialFilter = {
      educationTopicIds: this.state.topics.map(t => t.id),
      publisherIds: publishers.map(p => p.id),
      tagIds: [],
      educationOnly: true,
      searchString: ""
    }
    if(this.props.location.state){
      let analystId = this.props.location.state.analyst;
      initialFilter.publisherIds = [analystId];
      let temp = this.state.publishersSelected;
      temp.push(analystId);
      this.setState({publishersSelected: temp});
    }
    const posts = await getEducationalPosts(initialFilter, 10, 0);
    this.setState({posts: posts ? posts.data : []});
    if(!user){
      const script = document.createElement('script');
      script.src = "https://app.getresponse.com/view_webform_v2.js?u=SYHN&webforms_id=SSep1";
      script.async = true;
      document.getElementsByClassName("get-discount")[0].appendChild(script);
    }
  }

  selectTopics = (event, id) => {
    if(this.state.topicsSelected.includes(id)){
      let temp = this.state.topicsSelected;
      const index = temp.indexOf(id);
      temp.splice(index, 1);
      this.setState({topicsSelected: temp});
    }else{
      let temp = this.state.topicsSelected;
      temp.push(id);
      this.setState({topicsSelected: temp});
    }
    this.fetchPosts();
  }

  selectPublisher = (event, id) => {
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
    this.fetchPosts();
  }

  clearFilters = () => {
    this.setState({
      topicsSelected: [],
      publishersSelected: []
    }, () => {
      this.fetchPosts();
    })
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
        educationTopicIds: this.state.topicsSelected,
        publisherIds: this.state.publishersSelected,
        tagIds: [],
        educationOnly: true,
        searchString: ""
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

  fetchPosts = async () => {
    const filter = {
      educationTopicIds: this.state.topicsSelected,
      publisherIds: this.state.publishersSelected,
      tagIds: [],
      educationOnly: true,
      searchString: ""
    }
    const posts = await getEducationalPosts(filter, 10, 0);
    this.setState({posts: posts ? posts.data : []});
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Education" subtitle="" className="text-sm-left mb-3" />
        </Row>
        <Row noGutters className="page-header py-4">
          <Col lg='2'>
            <div className='get-discount'>
              
            </div>
          </Col>
          <Col lg='10'>
            <div className='filters text-right'>
              {JSON.parse(localStorage.getItem("publishers")).map((publisher, idx) => (
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
        <Row noGutters>
          {this.state.topics.map((topic, id) => (
            <Button key={topic.id} outline theme="warning" className="mb-2 mr-1" active={this.state.topicsSelected.includes(topic.id)} onClick={e => this.selectTopics(e, topic.id)}>
              {topic.name}
            </Button>
          ))}
        </Row>
        <Row id={'post-wrapper'}>
          {this.state.posts.map((post, idx) => (
            <Post
              key={idx}
              col={"3"}
              post={post}
            />
          ))}
        </Row>
      </Container>
    );
  }
}

export default Education;
