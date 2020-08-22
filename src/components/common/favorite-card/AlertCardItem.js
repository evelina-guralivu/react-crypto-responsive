import React from "react";
import PropTypes from "prop-types";

const AlertCardItem = ({
  type,
  post,
}) => (
  <div className='favorite-item'>
    <i
      className="material-icons favorite-star"
    >
      star_border
    </i>
    <div className='notif-content'>
      <p className='notif-text'>
        {post.content && post.content.substring(0, 70) + "..."}
      </p>
      <div className='date-block'>
        <span className='date'>
          {post.createdAt}
        </span>
      </div>
    </div>
  </div>
);

AlertCardItem.propTypes = {
  type: PropTypes.string.isRequired,
};

AlertCardItem.defaultProps = {
};

export default AlertCardItem;
