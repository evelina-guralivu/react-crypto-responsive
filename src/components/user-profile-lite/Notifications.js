import React from "react";
import {
  Card,
  Row,
  Col,
  FormCheckbox,
} from "shards-react";
import Photo from "../common/notif-grid-table/photo";
import { getNotificationPreference, setNotificationPreference } from "../../api";

const platforms = {
  'sms' : 3,
  'email': 2,
  'platform' : 1
}

class NotificationsTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: JSON.parse(localStorage.getItem("user")),
    };
  }
  
  componentDidMount = async () => {
    let user;
    if(localStorage.getItem("user") !== null){
      user = JSON.parse(localStorage.getItem("user"));
      const preferencesRes = await getNotificationPreference(user.id);
      this.setState({
        preferences: preferencesRes.data
      })
    }
  }

  togglePref = async (analystId, platform, hasItem, type) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let temp = this.state.preferences;
    if(hasItem){
      let el = temp[type].filter(p => p.notificationTypeId === platforms[platform] && p.publisherId === analystId)[0];
      temp[type] = temp[type].filter(p => p !== el);
    }else{
      temp[type].push({
        "publisherId": analystId,
        "notificationTypeId": platforms[platform]
      });
    }
    setNotificationPreference(user.id, temp);
    this.setState({
      preferences: temp
    })
  }

  changeAlertsImTracking = (platform, hasItem) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let temp = this.state.preferences;
    if(!hasItem){
      temp.special['alertsImTracking'].push({
        notificationTypeId: platforms[platform]
      });
    }else{
      temp.special['alertsImTracking'] = temp.special['alertsImTracking'].filter(p => p.notificationTypeId !== platforms[platform]);
    }
    setNotificationPreference(user.id, temp);
    this.setState({
      preferences: temp
    })
  }

  changePostReplies = (platform, hasItem) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let temp = this.state.preferences;
    if(!hasItem){
      temp.special['publisherPostReplies'].push({
        notificationTypeId: platforms[platform]
      });
    }else{
      temp.special['publisherPostReplies'] = temp.special['publisherPostReplies'].filter(p => p.notificationTypeId !== platforms[platform]);
    }
    setNotificationPreference(user.id, temp);
    this.setState({
      preferences: temp
    })
  }
  
  render(){
    const analysts = JSON.parse(localStorage.getItem("publishers"));
    let alertsImTrackingHasEmail, alertsImTrackingHasPlatform, alertsImTrackingHasSms;
    let publisherPostRepliesHasEmail, publisherPostRepliesHasPlatform, publisherPostRepliesHasSms;
    if(this.state.preferences){
      const alertsImTracking = this.state.preferences.special.alertsImTracking.map(p => p.notificationTypeId);
      alertsImTrackingHasEmail = alertsImTracking.indexOf(2) !== -1;
      alertsImTrackingHasPlatform = alertsImTracking.indexOf(1) !== -1;
      alertsImTrackingHasSms = alertsImTracking.indexOf(3) !== -1;
      const publisherPostReplies = this.state.preferences.special.publisherPostReplies.map(p => p.notificationTypeId);
      publisherPostRepliesHasEmail = publisherPostReplies.indexOf(2) !== -1;
      publisherPostRepliesHasPlatform = publisherPostReplies.indexOf(1) !== -1;
      publisherPostRepliesHasSms = publisherPostReplies.indexOf(3) !== -1;
    }
    return(
      <React.Fragment>
        <Card small className="mb-4 p-4 notif">
          <Row>
            <Col>
            <div className='notif-grid-table'>
              <div className='notif-grid-table-headers'>
                <span>Analyst</span>
                <span>Alerts</span>
                <span>Posts</span>
              </div>
              <div className='notif-grid-table-small-headers'>
                <span>Name</span>
                <div className='grid-col'>
                  <span>Email</span>
                  <span>Platform</span>
                  <span>SMS</span>
                </div>
                <div className='grid-col'>
                  <span>Email</span>
                  <span>Platform</span>
                  <span>SMS</span>
                </div>
              </div>
              {this.state.preferences && analysts.map(user => {
                let publisherAlertPreference = this.state.preferences.alerts.filter(p => p.publisherId === user.id).map(p => p.notificationTypeId);
                let alertHasEmail = publisherAlertPreference.indexOf(2) !== -1;
                let alertHasPlatform = publisherAlertPreference.indexOf(1) !== -1;
                let alertHasSms = publisherAlertPreference.indexOf(3) !== -1;
                let publisherPostPreference = this.state.preferences.posts.filter(p => p.publisherId === user.id).map(p => p.notificationTypeId);
                let postHasEmail = publisherPostPreference.indexOf(2) !== -1;
                let postHasPlatform = publisherPostPreference.indexOf(1) !== -1;
                let postHasSms = publisherPostPreference.indexOf(3) !== -1;
                return (
                  <div className='notif-grid-table-item'>
                  <div className='table-user-data'>
                  <Photo
                      avatar={user.avatar.small}
                      name={user.name}
                    />
                    <span className='name'>{user.name}</span>
                  </div>
                  <div className='grid-col'>
                      <FormCheckbox onChange={() => this.togglePref(user.id, 'email', postHasEmail, 'posts')} checked={postHasEmail}/>
                      <FormCheckbox onChange={() => this.togglePref(user.id, 'platform', postHasPlatform, 'posts')} checked={postHasPlatform}/>
                      <FormCheckbox onChange={() => this.togglePref(user.id, 'sms', postHasSms, 'posts')} checked={postHasSms}/>
                  </div>
                  <div className='grid-col'>
                      <FormCheckbox onChange={() => this.togglePref(user.id, 'email', alertHasEmail, 'alerts')} checked={alertHasEmail}/>
                      <FormCheckbox onChange={() => this.togglePref(user.id, 'platform', alertHasPlatform, 'alerts')} checked={alertHasPlatform}/>
                      <FormCheckbox onChange={() => this.togglePref(user.id, 'sms', alertHasSms, 'alerts')} checked={alertHasSms}/>
                  </div>
                </div>
                )
              })}
              </div>
            </Col>
          </Row>
          <br/><br/><br/>
          <Row>
            <Col>
            <div className='notif-grid-table'>
              <div className='notif-grid-table-headers'>
                <span>Special</span>
              </div>
              <div className='notif-grid-table-small-headers'>
                <span>Name</span>
                <div className='grid-col'>
                  <span>Email</span>
                  <span>Platform</span>
                  <span>SMS</span>
                </div>
              </div>
              {this.state.preferences && 
                <React.Fragment>
                  <div className='notif-grid-table-item'>
                    <div className='table-user-data'>
                      Alerts I'm Tracking
                    </div>
                    <div className='grid-col'>
                          <FormCheckbox checked={alertsImTrackingHasEmail} onChange={() => this.changeAlertsImTracking('email', alertsImTrackingHasEmail)}/>
                          <FormCheckbox checked={alertsImTrackingHasPlatform} onChange={() => this.changeAlertsImTracking('platform', alertsImTrackingHasPlatform)} />
                          <FormCheckbox checked={alertsImTrackingHasSms} onChange={() => this.changeAlertsImTracking('sms', alertsImTrackingHasSms)} />
                    </div>
                  </div>
                  <div className='notif-grid-table-item'>
                    <div className='table-user-data'>
                      Publisher Post Replies
                    </div>
                    <div className='grid-col'>
                        <FormCheckbox checked={publisherPostRepliesHasEmail} onChange={() => this.changePostReplies('email', publisherPostRepliesHasEmail)}/>
                        <FormCheckbox checked={publisherPostRepliesHasPlatform} onChange={() => this.changePostReplies('platform', publisherPostRepliesHasPlatform)}/>
                        <FormCheckbox checked={publisherPostRepliesHasSms} onChange={() => this.changePostReplies('sms', publisherPostRepliesHasSms)}/>
                    </div>
                  </div>
                  </React.Fragment>
                  }
              </div>
            </Col>
          </Row>
        </Card>
  </React.Fragment>
  )}};

export default NotificationsTab;
