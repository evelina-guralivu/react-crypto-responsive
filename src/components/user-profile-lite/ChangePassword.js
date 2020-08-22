import React from "react";
import {
  Card,
  Row,
  Col,
  FormInput,
  Alert,
  Button,
  FormGroup
} from "shards-react";
import { patchUser } from "../../api";


class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount = () => {
    let user;
    if(localStorage.getItem("user") !== null){
      user = JSON.parse(localStorage.getItem("user"));
      this.setState({
        user: user
      })
    }
  }

  changePassword = async () => {
    if(this.state.newpass !== this.state.confimed){
      this.setState({
        invalidPassword: true
      })
    }else{
      let data = {
        password: this.state.confimed
      }
      let response = await patchUser(this.state.user.id, data);
      this.setState({
        updateOk: true
      })
    }
  }

  render(){
    return(
    <Col sm={{ size: 4, offset: 4 }}>
      <Card small className="mb-4 p-4">
        <Row>
          <Col>
              <FormGroup className="form-group">
                <label htmlFor="feCurrPass">New password</label>
                <FormInput
                  id="feNewPass"
                  type='password'
                  placeholder='Enter your new password'
                  onChange={(text) => this.setState({newpass: text.target.value})}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <label htmlFor="feCurrPass">Confirm password</label>
                <FormInput
                  id="feConfirmPass"
                  placeholder="Please repeat your new password"
                  type='password'
                  onChange={(text) => this.setState({confimed: text.target.value})}
                />
              </FormGroup>
              <Button
                theme="accent"
                className='btn-gradient mt-4 w100'
                onClick={this.changePassword}
              >
                Update password
              </Button>
              <br/><br/>
              {this.state.updateOk && <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i> Account updated!
      </Alert>}
      {this.state.invalidPassword && <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i> Passwords do not match
      </Alert>}
          </Col>
        </Row>
      </Card>
    </Col>
)}};

export default ChangePassword;
