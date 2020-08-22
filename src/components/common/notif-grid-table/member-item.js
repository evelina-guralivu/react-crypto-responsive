import React, { useState } from "react";
import PropTypes from "prop-types";
import Photo from "./photo";
import { FormCheckbox } from "shards-react";

const NotificationsAlertsItem = ({
  name,
  avatar,
  checked,
}) => {
  const [checboxChecked, toggleCheckBox] = useState(checked);
  return (
    <div className='notif-grid-alert-item'>
      <FormCheckbox onChange={() => toggleCheckBox(!checboxChecked)}  checked={checboxChecked}/>
      <div className='table-user-data'>
        <Photo
          avatar={avatar}
          name={name}
        />
        <span className='name'>{name}</span>
      </div>
    </div>
  )
};

NotificationsAlertsItem.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  checked: PropTypes.bool,
};


export default NotificationsAlertsItem;
