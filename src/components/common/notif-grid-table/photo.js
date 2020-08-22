import React from "react";
import PropTypes from "prop-types";

const Photo = React.memo(({
  avatar,
  name,
}) => {
  return (
    <div className='user_photo'
      style={{background: "#"+((1<<24)*Math.random()|0).toString(16)}}
    >
      {avatar !== null && !!avatar ?
        <img src={avatar} alt='avatar' />
        :
        name ? name.split(" ").map(x => x[0]).join("").toUpperCase() : 'N/A'
      }
    </div>
  )
});

Photo.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
};


export default Photo;
