import React from "react";
import {
  Row,
  Col,
  Container,
} from "shards-react";
import FavoritesCard from "../common/favorite-card/";
import { getFovuritePosts, createFavoritePost, getFavoriteAlerts } from "../../api";

export default class FavoritesTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      alerts: []
    }
  }

  componentDidMount = async () => {
    const posts = await getFovuritePosts();
    const alerts = await getFavoriteAlerts();
    this.setState({
      posts: posts.data,
      alerts: alerts.data
    })
  }

  render(){
    return (
  <Container fluid>
    <Row>
      <Col lg='6' md='12'>
        <FavoritesCard
          loggedIn={false}
          type='posts'
          posts={this.state.posts}/>
      </Col>
      <Col lg='6' md='12'>
        <FavoritesCard
          type='alerts'
          posts={this.state.alerts}
        />
      </Col>
    </Row>
  </Container>
)};

}