import React from "react";
import {
  Row,
  Col,
  Container,
  FormCheckbox,
} from "shards-react";
import Photo from "../common/notif-grid-table/photo";
import { getPublisherVote, setPublisherVote } from "../../api";

class AnalystRating extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      analysts: JSON.parse(localStorage.getItem("publishers")),
      votes: []
    }
  }

  componentDidMount = async () => {
    let user;
    if(localStorage.getItem("user") !== null){
      user = JSON.parse(localStorage.getItem("user"));
      const votesRes = await getPublisherVote(user.id);
      this.setState({
        votes: votesRes.data
      })
    }
  }

  togglePref = async (publisherId, checked) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if(checked){
      let temp = this.state.votes.filter(p => p !== publisherId)
      await setPublisherVote(user.id, temp);
      const votesRes = await getPublisherVote(user.id);
      this.setState({
        votes: votesRes.data
      })
    }else{
      let temp = this.state.votes;
      temp.push(publisherId);
      await setPublisherVote(user.id, temp);
      const votesRes = await getPublisherVote(user.id);
      this.setState({
        votes: votesRes.data
      })
    }
  }

  render(){  
  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          <p className='rating-text'>
            We’re gathering feedback regarding which analysts you’re receiving the best value from here at Bitcoin Live.<br />
            Please select up to 3 traders who you feel you’re getting the most out of.<br />
            <br />
            We’ll be rewarding the analysts for their efforts accordingly on our end. So, please be authentic and mindful with your selections!
          </p>
        </Col>
      </Row>
      <Row>
        {this.state.analysts.map(user => {
          let isChecked = this.state.votes.indexOf(user.id) !== -1;
          return (
            <Col lg={4} key={user.key}>
              <div className='analyst-card'>
                <div className='user-data'>
                  <Photo
                    name={user.name}
                    avatar={user.avatar.small}
                  />
                  <span>{user.name}</span>
                </div>
                <FormCheckbox onChange={() => this.togglePref(user.id, isChecked)} checked={isChecked} />
              </div>
            </Col>
          )
        })}
      </Row>
    </Container>
  )}
};

export default AnalystRating;
