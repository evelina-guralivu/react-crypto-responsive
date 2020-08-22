import React from "react";
import PropTypes from "prop-types";
import FavoriteCardItem from "./card-item";
import AlertCardItem from "./AlertCardItem";
import SeeAllBtn from "../see-all-btn";
import { Link } from "react-router-dom";

const FavoritesCard = ({
  loggedIn,
  type,
  seeAll,
  posts,
}) => (
  <div className='favoriteCard'>
    <div className='card-header'>
      <span className='title'>
        {type === 'posts' && (
          'Posts'
        )}
        {type === 'alerts' && (
          'Alerts'
        )}
      </span>
      <SeeAllBtn link={seeAll} />
    </div>
    <div className='card-body'>
    {loggedIn && <React.Fragment><br/><br/>
      <div className="alerts-premium">Alerts are available only to registered members. Please check prices below.</div>
      <Link to={'/prices'} className="alerts-premium-linear">
        Become A Member 
      </Link>
      </React.Fragment>}
     {type ==='posts' && posts.map(post => (
     <FavoriteCardItem
        type={type}
        post={post}
     />))}
    {type ==='alerts' && posts.map(post => (
     <AlertCardItem
        type={type}
        post={post}
     />))}
    </div>

  </div>
);

FavoritesCard.propTypes = {
  type: PropTypes.string.isRequired,
};

FavoritesCard.defaultProps = {
};

export default FavoritesCard;
