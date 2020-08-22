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
import { resetPassword } from "../../api";

class ForgotForm extends React.Component {

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
  };

  resetPassword = async () => {
    this.setState({
      showError: false,
      showSucess: false
    })
    const res = await resetPassword(this.state.username);
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
        showSuccess: true,
      })
    }
  };

  keyPress = (e) => {
    if(e.keyCode === 13){
      this.resetPassword();
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
                  <label htmlFor="feCurrPass">Email</label>
                  <FormInput
                    id="feCurrPass"
                    type='email'
                    placeholder='Email'
                    value={this.state.username}
                    onChange={this.changeUsername}
                    onKeyDown={this.keyPress}
                  />
                </FormGroup>
                <Button
                  theme="accent"
                  className='btn-gradient mt-4 w100'
                  onClick={() => this.resetPassword()}>
                  Reset Password
              </Button>
                </Form>
                <br/><br/>
               {this.state.showError && <Alert className="mb-0">
                  <i className="fa fa-error mx-2"></i>{this.state.errorText}</Alert>}
                {this.state.showSuccess && <Alert className="mb-0">
                <i className="fa fa-info mx-2"></i>We have sent you a password reset link. Please check your email.</Alert>}
            </Col>
          </Row>
        </Card>
      </Col>
    )
  };
};

export default ForgotForm;
