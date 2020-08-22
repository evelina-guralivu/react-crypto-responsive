import React, { useState } from "react";
import PropTypes from "prop-types";
import Photo from "./photo";
import { FormCheckbox } from "shards-react";

const NotificationsGridTableItem = ({
  name,
  avatar,
  preferences,
}) => {
  const [emailChecked, toggleEmail] = useState(preferences.email);
  const [platformChecked, togglePlatform] = useState(preferences.platform);
  const [smsChecked, toggleSms] = useState(preferences.sms);
  return (
    <div className='notif-grid-table-item'>
      <div className='table-user-data'>
        <Photo
          avatar={avatar}
          name={name}
        />
        <span className='name'>{name}</span>
      </div>
      <div className='grid-col'>
        { <FormCheckbox onChange={() => toggleEmail(!emailChecked)}  checked={emailChecked}/> }
        {  <FormCheckbox onChange={() => togglePlatform(!platformChecked)}  checked={platformChecked}/>}
        {  <FormCheckbox onChange={() => toggleSms(!smsChecked)}  checked={smsChecked}/>}
      </div>
    </div>
  )
};

NotificationsGridTableItem.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  posts: PropTypes.object,
  alerts: PropTypes.object,
};


export default NotificationsGridTableItem;
