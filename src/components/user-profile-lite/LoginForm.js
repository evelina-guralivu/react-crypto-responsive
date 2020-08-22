import React from "react";
import {
  Card,
  Row,
  Col,
  Form,
  FormInput,
  Button,
  FormGroup,
  Alert
} from "shards-react";
import config from "../../config";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../../api";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      session: null,
      user: null,
      username: '',
      password: ''
    }
  }

  changeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  changePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  processLogin = async () => {
    var data = {
      "email": this.state.username,
      "password": this.state.password
    };
    const res = await loginUser(data);
    if(res.status === 422){
      let errorString = '';
      if(!!res.data.validationErrors){
        Object.values(res.data.validationErrors).map(v => {
          errorString += v;
        })
      }
      this.setState({
        showError: true,
        errorText: errorString === '' ? res.data.error : errorString
      })
    }else{
        this.setState({
          session: res,
        });
        localStorage.setItem("session", JSON.stringify(res.data.token));
        this.getProfile(res.data);
    }
  };

  getProfile = (session) => {
    fetch(config.baseUrl + "user/" + session.userId, {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': session.token
      }
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("user", JSON.stringify(data));
        this.setState({
          authenticated: true,
          user: data
        });
      })
      .catch((error) => {
      })
  }

  keyPress = (e) => {
    if(e.keyCode === 13){
      this.processLogin();
    }
  }

  render() {
    return (
      <Col sm={{ size: 4, offset: 4 }}>
        <Card small className="mb-4 p-4">
          <Row>
            <Col>
              <Form>
                <FormGroup className="form-group">
                  <label htmlFor="feCurrPass">Username</label>
                  <FormInput
                    id="feCurrPass"
                    type='text'
                    placeholder='Username'
                    value={this.state.username}
                    onChange={this.changeUsername}
                    onKeyDown={this.keyPress}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <label htmlFor="feCurrPass">Password</label>
                  <FormInput
                    id="feNewPass"
                    type='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.changePassword}
                    onKeyDown={this.keyPress}
                  />
                </FormGroup>
                <Button
                  theme="accent"
                  className='btn-gradient mt-4 w100'
                  onClick={() => this.processLogin()}
                >
                  Login
            </Button>
                {this.state.authenticated && <Redirect to="/blogs/premium/" push />}
              </Form>
              <br/>
              <Link to={"/prices"}>Not a member? Sign up.</Link>
              <br/>
              <Link to={"/forgot"}>Forgot password?</Link>
              <br/><br/>
               {this.state.showError && <Alert className="mb-0">
                  <i className="fa fa-error mx-2"></i>{this.state.errorText}</Alert>}
            </Col>
          </Row>
        </Card>
      </Col>
    )
  };
};

export default Login;
