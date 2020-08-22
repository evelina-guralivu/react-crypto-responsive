/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Badge
} from "shards-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Photo from "./notif-grid-table/photo";
import { Link } from "react-router-dom";

const Author = withRouter(({
  url,
  name,
  date,
  avatar,
  badges,
}) => {
  return (
    <div className='wrapper author'>
      {url && <Link to={url}>
        <Photo
          avatar={avatar}
          name={name}
        />
      </Link>}
      <div className="d-flex flex-column justify-content-center">
        <span className="card-post__author-name">
          {url && <Link to={url}>{name}</Link>}
        </span>
        <small className="text-muted">{date}</small>
        {badges && (
          <small className="text-muted">
            {badges.map((badge, idx) => {
              return (
                <Badge
                  key={idx}
                  pill
                  className={`card-post__category ${badge.badge}`}
                >
                  {badge.title}
                </Badge>
              )
            })}
          </small>
        )}
      </div>
      
    </div>
  )
});

Author.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  avatar: PropTypes.string,
  badges: PropTypes.array,
};

export default Author;