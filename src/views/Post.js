/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  FormGroup,
  FormInput,
  Button,
  FormTextarea,
  Badge,
} from "shards-react";
import Photo from "../components/common/notif-grid-table/photo";
import { CardBody } from "reactstrap";
import PlansCards from "../components/common/PlansCards";
import Author from "../components/common/author";
import { getPost, getPostBySlug, getComments, createComment, createLike, removeLike, createLikeOnPost, deleteLikeOnPost, getFovuritePosts, createFavoritePost } from "../api";
import SuggestedPost from "../components/common/post";
import { Link, matchPath } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';

const getParams = pathname => {
  const matchBlog = matchPath(pathname, {
    path: `/blog/:postName`,
  });
  return (matchBlog && matchBlog.params) || {};
};

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isLoading: true,
      currentComment: '',
      suggestedPosts: [],
      isFavorite: false,
      showShare: false,
    };
  }

  componentDidMount = async () => {
    this.fetchPost(this.props.match.params.postName);
  }

  fetchPost = async slug => {
    const resp = await getPostBySlug(slug);
    let suggested = [];
    resp.data.suggestedPostIds.slice(0, 3).forEach(async (id) => {
      let post = await getPost(id);
      suggested.push(post.data);
      this.setState({
        suggestedPosts: suggested
      })
    });
    if(resp.data.suggestedPostIds.length === 0){
      this.setState({
        suggestedPosts: []
      })
    }
    let user = null;
    let comments = null;
    let favorites = null;
    if (localStorage.getItem("user") !== null) {
      user = JSON.parse(localStorage.getItem("user"));
      let res = await getComments(resp.data.id);
      comments = res.data.reverse();
      favorites = await getFovuritePosts();
      favorites = favorites.data;
      this.setState({
        isFavorite: favorites.filter(f => f.id === resp.data.id).length > 0
      });
    }
    this.setState({
      post: resp.data,
      comments: comments,
      user: user,
      favorites: favorites,
      isLoading: false,
    })
    // Check if aff id detect in post url
    const urlParams = new URLSearchParams(window.location.search);
    localStorage.setItem("a", urlParams.get('a'));
  }

  componentDidUpdate(prevProps, prevState) {
    const { pathname } = this.props.location;
    const { pathname: prevPathname } = prevProps.location;

    const currentParams = getParams(pathname);
    const prevParams = getParams(prevPathname);

    if (currentParams.postName && currentParams.postName !== prevParams.postName) {
      this.fetchPost(currentParams.postName);
    }
  }

  reloadComments = async (postId) => {
    let res = await getComments(postId);
    this.setState({
      comments: res.data.reverse()
    });
  }

  addComment = async (comment) => {
    const data = {
      "postId": this.state.post.id,
      "parentCommentId": comment,
      "content": this.state.currentComment
    }
    const resp = await createComment(data);
    let comments = this.state.comments;
    comments.unshift(resp.data);
    this.setState({
      comments: comments,
      currentComment: ''
    })
  }

  addLike = async (comment) => {
    console.log(comment.likes.likedByCurrentUser);
    if(!comment.likes.likedByCurrentUser){
      await createLike(comment.id);
    }else{
      await removeLike(comment.id)
    }
    const comments = await getComments(this.state.post.id);
    this.setState({
      comments: comments.data.reverse(),
    })
    this.reloadComments(this.state.post.id);
  }

  setCurrentComment = (event) => {
    this.setState({ currentComment: event.target.value });
  }

  setAsFavourite = () => {
    createFavoritePost(this.state.post.id);
    let p = this.state.post;
    p.isFavourite = !this.state.post.isFavourite;
    this.setState({
      post: p
    })
  }

  showShare = () => {
    this.setState({
      showShare: !this.state.showShare
    })
  }

  likePost = async () => {
    const resp = await createLikeOnPost(this.state.post.id);
    let temp = this.state.post;
    temp.likes.likedByCurrentUser = !temp.likes.likedByCurrentUser;
    if(temp.likes.likedByCurrentUser){
      temp.likes.total = temp.likes.total + 1;
    }else{
      temp.likes.total = temp.likes.total - 1;
      const resp = await deleteLikeOnPost(this.state.post.id);
    }
    this.setState({
      post: temp
    })
  }

  render() {
    const { comments, user } = this.state;
    return (
      <Container fluid className="main-content-container">
        <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text='Loading your content...'
          >
        <Row>
          <Col lg={{ size: 10, offset: 1 }} md='12'>
            <Card small className="mb-5 mt-5 p-5 post-overview">
              <div className='post-data'>
                <div className='pic' style={{ backgroundImage: `url('${this.state.post && this.state.post.image.original}')` }}>
                </div>
                <br />
                <div className='post-header'>
                  <h4>{this.state.post && this.state.post && this.state.post.title}</h4>
                  <div className='badges'>
                    <Badge
                      pill
                      className={`card-post__category badge-content-type`}
                    >
                      {this.state.post && this.state.post.contentTypeId === 1 ? "Blog" : "Video"}
                    </Badge>
                    {this.state.post && this.state.post.tags.map((tag, idx) => (
                      <Badge
                        pill
                        className={`card-post__category badge-content-tag`}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="card-post__author d-flex author-data">
                  <Author
                    url={this.state.post && `/analyst/${this.state.post.publisher.slug}`}
                    name={this.state.post && this.state.post.publisher.name}
                    avatar={this.state.post && this.state.post.publisher.avatar.small}
                    date={this.state.post && this.state.post.publishedAt}
                    badges={['Analyst']}
                  />
                  <div className='social'>
                    <span className='add-favorite'>
                    {user && <div className='link-social'>
                        <div class="rating" style={{position: "relative", top: "-4px"}}>
                              {this.state.post.isFavourite ? <span className="selected" onClick={this.setAsFavourite}>★</span> : <span onClick={this.setAsFavourite}>☆</span>}Favorite
                        </div>
                        </div>}
                        {user && <div className='link-social'>
                        <i
                          className={this.state.post && this.state.post.likes.likedByCurrentUser ? "material-icons thumb_up selected" : "material-icons thumb_up"}
                          onClick={this.likePost}
                        >
                          thumb_up
                      </i>
                        {this.state.post && this.state.post.likes.total} Likes
                        </div>}
                        {this.state.post && <div className='link-social'>
                          <a href={"http://twitter.com/share?text=Check this post from bitcoin.live&url=" + window.location.origin + this.state.post.url + "?a=" + this.state.post.publisher.slug}>
                            <i className="fab fa-twitter-square" style={{color: '#1DA1F2'}}></i>
                          </a>
                        </div>}
                        {this.state.post && <div className='link-social'>
                          <a href={"https://www.facebook.com/sharer/sharer.php?u=" + window.location.origin + this.state.post.url + "?a=" + this.state.post.publisher.slug} target="_blank">
                            <i className="fab fa-facebook-square" style={{color: '#3B5998'}}></i>
                          </a>
                        </div>}
                      <div className='link-social dropdown-share'>
                        <i
                          className="material-icons share"
                          onClick={this.showShare}
                        >
                          share
                      </i>
                        Share
                        <div className={!this.state.showShare ? 'dropdown-content' : 'dropdown-content show-share'}>
                        {this.state.post && <FormGroup className="form-group">
                          <label htmlFor="feCurrPass">URL:</label>
                          <FormInput
                            id="feNewPass"
                            type='text'
                            value={window.location.origin + this.state.post.url + "?a=" + this.state.post.publisher.slug}
                          />
                        </FormGroup>}
                        </div>
                        </div>
                    </span>
                  </div>
                </div>
              </div>
              {!user && this.state.post && ((this.state.post.contentTypeId === 1 && this.state.post.content === undefined) || (this.state.post.contentTypeId === 2 && this.state.post.embeddedVideo === undefined))
                && <React.Fragment><CardBody className={"remove-style"} dangerouslySetInnerHTML={{ __html: this.state.post && this.state.post.excerpt }}></CardBody><PlansCards /></React.Fragment>}
              {user && this.state.post && ((this.state.post.contentTypeId === 1 && this.state.post.content === undefined) || (this.state.post.contentTypeId === 2 && this.state.post.embeddedVideo === undefined))
                && <React.Fragment><CardBody className={"remove-style"} dangerouslySetInnerHTML={{ __html: this.state.post && this.state.post.excerpt }}></CardBody>
                <br/><br/>
                        <div className="alerts-premium">Please renew your membership to be able to continue reading.</div>
                        <Link to={'/user-profile'} className="alerts-premium-linear">
                          My Billing Area
                        </Link>
                <br/><br/>
              </React.Fragment>}
              {this.state.post && this.state.post.embeddedVideo !== undefined && this.state.post.contentTypeId === 2 && <div className={"wistia_embed wistia_async_" + this.state.post.embeddedVideo.mediaId}></div>}
              {this.state.post && this.state.post.content !== undefined && <CardBody className={"remove-style"} dangerouslySetInnerHTML={{ __html: this.state.post && this.state.post.content }}></CardBody>}
              {this.state.suggestedPosts.length > 0 && <div className='suggested-posts'>
                <Row>
                  <Col lg='12'>
                    <span className='title'>
                      Suggested Posts
                  </span>
                  </Col>
                  {this.state.suggestedPosts.map((post, idx) => (
                    <SuggestedPost
                      key={idx}
                      col='4'
                      post={post}
                      type='suggested'
                    />
                  ))}
                </Row>
              </div>}
              {!user && <div className='add-comment'>
                <React.Fragment><br/><br/>
                <div className="alerts-premium">Comments are available only to registered members. Please login or become a member.</div>
                <Link to={'/login'} className="alerts-premium-linear">
                  Login
                </Link>
                <br/>
                <Link to={'/prices'} className="alerts-premium-linear">
                  Become A Member 
                </Link>
                </React.Fragment>
              </div>}
              {user && this.state.post.content && <div className='add-comment'>
                <span className='comments-amount'>
                  {!!comments && <div>{comments.length} Comments</div>}
                </span>
                <div className='area'>
                  <Photo avatar={!!user ? user.avatar.small : null} name={!!user ? user.name : ''} />
                  <div className="form-group">
                    <FormTextarea id="addComment" rows="3" placeholder='Leave a comment'
                      onChange={this.setCurrentComment} />
                  </div>
                </div>
                <div className='buttons text-right'>
                  <Button
                    theme="accent"
                    className='btn-orange'
                    onClick={() => this.addComment(null)}
                  >
                    ADD COMMENT
                </Button>
                </div>
                <div className='comments'>
                  {!!comments && comments.filter(c => c.parentCommentId === null).map((comment, id) => (
                    <div className='comment-item' id={comment.id}>
                      <Author
                        url={'#'}
                        name={comment.user.name}
                        date={comment.createdAt}
                        avatar={comment.user.avatar.small}
                      />
                      <div className='comment-body'>
                        <p className='comment-text' dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                        <div className='likes'>
                          <i
                            className={comment.likes.likedByCurrentUser ? "material-icons thumb_up selected" : "material-icons thumb_up"}
                            onClick={() => this.addLike(comment)}
                          >
                            thumb_up
                          </i>
                          {comment.likes.likedByCurrentUser && <span>You and {comment.likes.total - 1} others like this</span>}
                            {!comment.likes.likedByCurrentUser && <span>{comment.likes.total} Likes</span>}
                        </div>
                      </div>
                      <br />
                      {!!comments && comments.filter((c) => c.parentCommentId === comment.id).map((comment, id) => (
                        <div className='comment-item' id={comment.id}>
                          <Author
                            url={'#'}
                            name={comment.user.name}
                            date={comment.createdAt}
                            avatar={comment.user.avatar.small}
                          />
                          <div className='comment-body'>
                            <p className='comment-text' dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                            <div className='likes'>
                              <i
                                className={comment.likes.likedByCurrentUser ? "material-icons thumb_up selected" : "material-icons thumb_up"}
                                onClick={() => this.addLike(comment)}
                              >
                                thumb_up
                              </i>
                              {comment.likes.likedByCurrentUser && <span>You and {comment.likes.total - 1} others like this</span>}
                              {!comment.likes.likedByCurrentUser && <span>{comment.likes.total} Likes</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className='area'>
                        <Photo avatar={!!user ? user.avatar.small : null} name={!!user ? user.name : ''} />
                        <div className="form-group">
                          <FormTextarea id="addComment" rows="3" placeholder='Leave a comment'
                            onChange={this.setCurrentComment} />
                        </div>
                      </div>
                      <div className='buttons text-right'>
                        <Button
                          theme="accent"
                          className='btn-orange'
                          onClick={() => this.addComment(comment.id)}>
                          Add comment
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>}
            </Card>
          </Col>
        </Row>
        </LoadingOverlay>
      </Container>
    )
  }
};

export default Post;