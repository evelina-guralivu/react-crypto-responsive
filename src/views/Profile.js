import React, { useState } from "react";
import { Container, Row, Col } from "shards-react";

import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import ChangePassword from "../components/user-profile-lite/ChangePassword";
import Billing from "../components/user-profile-lite/Billing";
import NotificationsTab from "../components/user-profile-lite/Notifications";
import FavoritesTab from "../components/user-profile-lite/Favorites";
import AnalystRating from "../components/user-profile-lite/AnalystRating";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const toggleTab = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  return (
    <Container fluid className="main-content-container">
        <Row>
          <Col lg="12" fluid className='px-0'>
            <UserDetails
              activeTab={activeTab}
              toggleTab={toggleTab}
            />
          </Col>
        </Row>
      <br/><br/><br/>
      <Container fluid>
        {activeTab === 'profile' && <UserAccountDetails /> }
        {activeTab === 'billing' && <Billing /> }
        {activeTab === 'change_pwd' && <ChangePassword />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'favorites' && <FavoritesTab />}
        {activeTab === 'analysts' && <AnalystRating />}
      </Container>
    </Container>
  )
};

export default Profile;
