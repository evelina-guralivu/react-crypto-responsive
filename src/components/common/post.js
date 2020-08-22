/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
} from "shards-react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";


const Post = withRouter(({
  col,
  post,
  type,
  history,
}) => {
  return (
    <Col lg={col} md='12'>
      <Card small className="card-post mb-4">
      <Link to={post.url}><div
          className="card-post__image"
          style={{ backgroundImage: `url('${post.image.small}')` }}
        /></Link>
        <CardBody>
          <h5
            className="card-title"
          >
            <Link to={post.url} className={'black'}>
                {post.title}
            </Link>
          </h5>
          <Badge
            pill
            className={`card-post__category badge-content-type`}
          >
            {post.contentTypeId === 1 ? "Blog" : "Video"}
          </Badge>
            {post.tags.map((tag, idx) => (
              <Badge
                pill
                className={`card-post__category badge-content-tag`}
              >
                {tag.name}
              </Badge>
            ))}
            {post.educationTopics.map((topic, idx) => (
              <Badge
                pill
                className={`card-post__category badge-content-education`}
              >
                {topic.name}
              </Badge>
            ))}
        </CardBody>
        {type !== 'suggested' && (
          <CardFooter className="d-flex">
            <div className="card-post__author d-flex">
              <Link
                to={`/analyst/${post.publisher.slug}`}
                className="card-post__author-avatar card-post__author-avatar--small"
                style={{ backgroundImage: `url('${post.publisher.avatar.small}')` }}
              >
              </Link>
              <div className="d-flex flex-column justify-content-center ml-3 author-data">
                <span className="card-post__author-name">
                <Link to={`/analyst/${post.publisher.slug}`} className={'black'}>
                      {post.publisher.name}
                </Link>
                </span>
                <small className="text-muted">{post.publishedAt}</small>
                <small className="text-muted">
                <Badge
                  pill
                    className={`card-post__category bg-${post.userTypeTheme}`}
                  >
                    {post.userType}
                </Badge>
                </small>
              </div>
            </div>
            <div className="my-auto ml-auto">
            </div>
          </CardFooter>
        )}
      </Card>
    </Col>
  )
});

Post.propTypes = {
  /**
   * Posts in col.
   */
  col: PropTypes.string,
  /**
   * Post data.
   */
  post: PropTypes.object,
  /**
   * Post type.
  */
  type: PropTypes.string,
};

export default Post;