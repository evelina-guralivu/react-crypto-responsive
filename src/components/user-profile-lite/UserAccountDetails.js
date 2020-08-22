import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Row,
  Col,
  FormInput,
  FormTextarea,
  Button,
  Alert
} from "shards-react";
import { patchUser, getUser } from "../../api";

class UserAccountDetails extends React.Component {

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
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        ownAffiliateId: user.ownAffiliateId,
        bio: user.bio
      })
    }
  }

  patchUser = async () => {
    const data = {
      "name": this.state.name,
      "email": this.state.email,
      "phone": this.state.phone,
    }
    let res = await patchUser(this.state.id, data);
    if(res.status === 200){
      this.setState({
        updateOk: true
      })
      let userRes = await getUser(this.state.id);
      if(userRes.status === 200){
        localStorage.setItem("user", JSON.stringify(userRes.data));
        let user = JSON.parse(localStorage.getItem("user"));
        this.setState({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          ownAffiliateId: user.ownAffiliateId,
          bio: user.bio
        })
      }
    }
  }

  render() {
    return (
      <Card small className="mb-4 p-4">
        <Row>
          <Col>
              <Row form>
                {/* Last Name */}
                <Col md='6' lg="4" className="form-group">
                  <label htmlFor="feLastName">Display Name</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value={this.state.name}
                    onChange={(text) => this.setState({name: text.target.value})}
                  />
                </Col>
                {/* Email */}
                <Col md='6' lg="4" className="form-group">
                  <label htmlFor="feEmail">Email address</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={(text) => this.setState({email: text.target.value})}
                    autoComplete="email"
                  />
                </Col>
              </Row>
              <Row form>
                {/* Phone number */}
                <Col md='6' lg="4" className="form-group">
                  <label htmlFor="feNumber">Phone number</label>
                  <FormInput
                    id="feNumber"
                    placeholder="Phone Number"
                    value={this.state.phone}
                    onChange={(text) => this.setState({phone: text.target.value})}
                  />
                </Col>
                {/* Username */}
                <Col md='6' lg="4" className="form-group">
                  <label htmlFor="feUsername">Affiliate ID</label>
                  <FormInput
                    id="feUsername"
                    placeholder="Username"
                    value={this.state.ownAffiliateId}
                    disabled
                    onChange={() => { }}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Description */}
                <Col md='12' lg="12" className="form-group">
                  <label htmlFor="feDescription">Bio</label>
                  <FormTextarea
                    id="feDescription"
                    rows="5"
                    placeholder='Enter here...'
                  >{this.state.bio}</FormTextarea>
                </Col>
                <Col md='12' lg="12 text-right buttons">
                  <Button
                    theme="accent"
                    className='cancel'
                  >
                    Cancel
              </Button>
                  <Button
                    theme="accent"
                    className='btn-gradient'
                    onClick={this.patchUser}
                  >
                    Save changes
              </Button>
                </Col>
                {this.state.updateOk && <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i> Account updated!
      </Alert>}
              </Row>
          </Col>
        </Row>
      </Card>
    )
  }
}

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
};

export default UserAccountDetails;
