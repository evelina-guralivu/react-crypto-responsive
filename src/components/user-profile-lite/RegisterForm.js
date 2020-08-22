import React from "react";
import {
  Card,
  Row,
  Col,
  Form,
  FormInput,
  Nav,
  NavItem,
  NavLink,
  Button,
  Alert,
  FormGroup
} from "shards-react";
import config from "../../config";
import { Redirect } from "react-router-dom";
import classnames from 'classnames';
import { registerUser, getAllEnabledProducts, getInvoiceState } from "../../api";
import MaskedInput from 'react-text-mask'

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      session: null,
      user: null,
      username: '',
      password: '',
      displayName: '',
      toggleTab: 1,
      activeTab: 'cc',
      showError: false,
      errorText: '',
      products: [],
      btcPaymentUrl: null
    }
  }

  componentDidMount = async () => {
    const products = await getAllEnabledProducts();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const planId = parseInt(params.get('planId'));
    this.setState({
      planId: planId,
      products: products.data});
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

  changeDisplayName = (event) => {
    this.setState({
      displayName: event.target.value
    })
  }

  toggleTab = tab => {
    if(this.state.activeTab !== tab){
      this.setState({activeTab: tab});
    }
  }

  register = async () => {
    this.setState({
      showError: false,
    })
    const paymentMethod = this.state.activeTab === 'cc' ? 1 : 2;
    const cc = {
      "holderName": this.state.ccName,
      "number": this.state.ccNumber.replace(/\s+/g, ''),
      "expirationDate": this.state.ccExpiration,
      "cvv": this.state.ccCVV
    }
    const data = {
      "name": this.state.displayName,
      "email": this.state.username,
      "password": this.state.password,
      "productId": this.state.planId,
      "paymentMethodId": paymentMethod,
    }
    if(paymentMethod === 1){
      data['creditCard'] = cc;
    }
    let affiliate = localStorage.getItem("a");
    if(affiliate !== null){
      data['affiliateId'] = affiliate;
    }
    const userResp = await registerUser(data);
    if(userResp.status === 422){
      let errorString = '';
      if(userResp.data.validationErrors){
        Object.values(userResp.data.validationErrors).map(v => {
          errorString += v;
        })
      }
      this.setState({
        showError: true,
        errorText: errorString
      })
    }else{
      if(paymentMethod === 1){
        this.getProfile(userResp.data);
      }else if(paymentMethod === 2){
        this.setState({
          btcPaymentUrl: userResp.data.url});
          const intervalId = setInterval(async () => {
            const invoiceStatus = await getInvoiceState(userResp.data.invoiceId);
            if(invoiceStatus && invoiceStatus.data.statusId !== 1){
              this.setState({
                registrationComplete: true
              });
              clearInterval(intervalId);
            }
          }, 1500);
      }
    }
  }

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
        localStorage.setItem("session", JSON.stringify(session.token));
        this.setState({
          authenticated: true,
          user: data
        });
      })
  }

  render() {
    return (
      <Col sm={{ size: 6, offset: 3 }}>
        {this.state.registrationComplete && <Redirect to="/success" push />}
        {this.state.authenticated && <Redirect to="/blogs/premium/" push />}
        <Card small className="mb-4 p-4">
          <Row>
            <Col>
              <Form>
                <h6 style={{color: '#FAA713'}}>General Information</h6>
                <br/>
                <FormGroup className="form-group">
                  <label htmlFor="feCurrPass">Display Name</label>
                  <FormInput
                    id="feCurrPass"
                    type='text'
                    placeholder='Display Name'
                    value={this.state.displayName}
                    onChange={this.changeDisplayName}
                  />
                </FormGroup>
                <Row>
                  <Col lg={{size: 6}}>
                    <FormGroup className="form-group">
                    <label htmlFor="feCurrPass">Email</label>
                    <FormInput
                      id="feCurrPass"
                      type='text'
                      placeholder='Email'
                      value={this.state.username}
                      onChange={this.changeUsername}
                    />
                  </FormGroup>
                  </Col>
                  <Col lg={{size: 6}}>
                    <FormGroup className="form-group">
                    <label htmlFor="feCurrPass">Password</label>
                    <FormInput
                      id="feNewPass"
                      type='password'
                      placeholder='Password'
                      value={this.state.password}
                      onChange={this.changePassword}
                    />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col lg={{size: 12}}>
                  <FormGroup>
                    <br/><br/>
                    <h6 style={{color: '#FAA713'}}>Plan Information</h6>
                    {this.state.planId && <div><b>{this.state.products.filter(p => p.id === this.state.planId)[0].name}</b> subscription at {this.state.products.filter(p => p.id === this.state.planId)[0].cost}$</div>}
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col lg={{size: 12}}>
                  <FormGroup>
                    <br/><br/>
                  <h6 style={{color: '#FAA713'}}>Payment Information</h6>
                  <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 'cc' })}
                      onClick={() => { this.toggleTab('cc'); }}
                    >
                      Credit Card
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 'bitcoin' })}
                      onClick={() => { this.toggleTab('bitcoin'); }}
                    >
                      Bitcoin
                    </NavLink>
                  </NavItem>
                  </Nav>
                  </FormGroup>
                  </Col>
                </Row>
                <br/>
                {this.state.activeTab === 'cc' && <Row>
                    <Col lg={{size: 6}}>
                      <FormGroup className="form-group">
                      <label htmlFor="feCurrPass">Card Holders Name</label>
                      <FormInput
                        type='text'
                        placeholder='Enter name'
                        value={this.state.ccName}
                        onChange={(text) => this.setState({ccName: text.target.value})}
                      />
                    </FormGroup>
                    </Col>
                    <Col lg={{size: 6}}>
                      <FormGroup className="form-group">
                      <label htmlFor="feCurrPass">Card Number</label>
                      <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ',/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ',/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ',/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                        className="form-control"
                        placeholder='0000 0000 0000 0000'
                        guide={false}
                        value={this.state.ccNumber}
                        onChange={(text) => this.setState({ccNumber: text.target.value})}
                      />
                    </FormGroup>
                    </Col>
                    <Col lg={{size: 6}}>
                      <FormGroup className="form-group">
                        <label htmlFor="feCurrPass">Expiration Date</label>
                        <MaskedInput
                          mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-',/[0-9]/, /[0-9]/]}
                          className="form-control"
                          placeholder='YYYY-MM'
                          guide={false}
                          value={this.state.ccExpiration}
                          onChange={(text) => this.setState({ccExpiration: text.target.value})}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={{size: 6}}>
                      <FormGroup className="form-group">
                        <label htmlFor="feCurrPass">CVV</label>
                        <MaskedInput
                          mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                          className="form-control"
                          placeholder='000'
                          guide={false}
                          value={this.state.ccCVV}
                          onChange={(text) => this.setState({ccCVV: text.target.value})}
                        />
                      </FormGroup>
                    </Col>
                </Row>}
                {this.state.activeTab === 'bitcoin' && <Row>
                   <Col lg='12'>
                      <p className='billing-title'>
                          <img
                            className="mr-1"
                            style={{ maxWidth: "100px"}}
                            src={require("../../images/bitcoin-live/bitcoin_PNG36.png")}
                            alt="Bitcoin Live"
                          />
                      </p>
                      {this.state.btcPaymentUrl === null && <div>Your invoice will be generated after you complete the order.</div>}
                      {this.state.btcPaymentUrl !== null && <iframe src={this.state.btcPaymentUrl} style={{height: 750, width: "100%", border: "none"}}></iframe>}
                    </Col>
                </Row>}
                {!this.state.btcPaymentUrl && <Button
                  theme="accent"
                  className='btn-gradient mt-4 w100'
                  onClick={this.register}>
                  Complete your order
                </Button>}
              </Form>
              <br/>
              {this.state.showError && <Alert className="mb-0">
                  <i className="fa fa-error mx-2"></i>{this.state.errorText}</Alert>}
            </Col>
          </Row>
        </Card>
      </Col>
    )
  };
};

export default RegisterForm;
