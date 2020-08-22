import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'; 

const FavoriteCardItem = ({
  type,
  post,
}) => (
  <div className='favorite-item'>
    <div className='notif-content'>
      <p className='notif-text'>
        <Link to={`${post.url}`} className={'black'}>{post.title}</Link>
      </p>
      <div className='date-block'>
        <span className='date'>
          {post.publishedAt}
        </span>
        {/*type === 'posts' && (
          <span className='rating'>
            <i
              className="material-icons"
            >
              arrow_upward
            </i>
            0
          </span>
        )*/}
      </div>
    </div>
  </div>
);

FavoriteCardItem.propTypes = {
  type: PropTypes.string.isRequired,
};

FavoriteCardItem.defaultProps = {
};

export default FavoriteCardItem;
