import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Row,
  Col,
  Button,
  Badge,
  FormGroup,
  FormCheckbox,
  FormInput,
  Alert,
  FormSelect
} from "shards-react";
import SimpleTable from "../common/SimpleTable";
import { getPaymentAllCards, getAllEnabledProducts, getInvoiceState, getSubscriptionStatus, getPaymentHistory, deletePaymentCard, createPaymentCard, renewOrBuySubscription } from "../../api";
import withStorage from "../common/WithStorage";
import LoadingOverlay from 'react-loading-overlay';

const tableHeadings = [
  'Product', 'Amount Paid', 'Date',
];

class Billing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cardInfo: null,
      isLoading: true,
      history: [],
      paymentMethodId: null,
    }
  }

  componentDidMount = async () => {

  }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    let user = this.props.load("user");
    if(prevState.user === null && user){
      this.setState({user: user});
      const cards = await getPaymentAllCards(user.id);
      const subscription = await getSubscriptionStatus(user.id);
      const paymentHistory = await getPaymentHistory(user.id);
      const products = await getAllEnabledProducts();
      this.setState({
        cardInfo: cards.data,
        history: paymentHistory.data,
        subscription: subscription.data,
        products: products.data,
        currentProduct: products.data.filter(p => p.id === subscription.data.productId),
        isLoading: false
      });
    }
  }

  deleteCard = async () => {
    let user = this.props.load("user");
    await deletePaymentCard(user.id, this.state.cardInfo.cards[0].id);
    const cards = await getPaymentAllCards(user.id);
    this.setState({
      cardInfo: cards.data,
    });
  }

  addCard = async () => {
    let user = this.props.load("user");
    const data = {
      "holderName": user.name + "_____",
      "number": this.state.ccNumber,
      "expirationDate": this.state.ccExpiration,
      "cvv": this.state.ccCVV
    }
    const createPayment = await createPaymentCard(user.id, data);
    const cards = await getPaymentAllCards(user.id);
    if(createPayment.status === 422){
      let errorString = '';
      if(!!createPayment.data.validationErrors){
        Object.values(createPayment.data.validationErrors).foreach(v => {
          errorString += v;
        })
      }
      this.setState({
        cardError: true,
        cardErrorInfo: errorString
      })
    }else{
      this.setState({
        cardInfo: cards.data,
      });
    }
  }

  payWithBtc = async () => {
    const data = {
      "productId": this.state.subscription.productId,
      "paymentMethodId": 2, // bitcoin
    }
    const sub = await renewOrBuySubscription(this.state.user.id, data);
    if(sub.data && sub.data.url){
      this.setState({
        btcPaymentDialog: true,
        btcPaymentUrl: sub.data.url
      })
    }
  }

  changePlan = async () => {
    this.setState({
      planChangeError: false,
    })
    const data = {
      "productId": this.state.newPlanId ? this.state.newPlanId : this.state.subscription.productId,   // If new plan id is not selected, use the current one
      "paymentMethodId": this.state.paymentMethodId ? this.state.paymentMethodId : this.state.subscription.renewalPaymentMethodId
    }
    const sub = await renewOrBuySubscription(this.state.user.id, data);
    if(sub.data && sub.data.url){
      this.setState({
        btcPaymentDialog: true,
        btcPaymentUrl: sub.data.url
      })
      const intervalId = setInterval(async () => {
        const invoiceStatus = await getInvoiceState(sub.data.invoiceId);
        if(invoiceStatus.data.statusId !== 1){
          this.setState({
            btcPaymentDialog: false,
            planChangeOk: true
          });
          clearInterval(intervalId);
        }
      }, 1500);
    }else if(sub.status === 200){
      this.setState({planChangeOk: true});
    }
    if(sub.status === 422){
      this.setState({
        planChangeError: true,
        planChangeErrorMessage: sub.data.error
      })
    }
  }

  selectPlan = (productId) => {
    this.setState({
      newPlanId: productId
    })
  }

  changePaymentMethod = (event) => {
    const val = event.target.value;
    this.setState({
      paymentMethodId: val === 'bitcoin' ? 2 : 1
    })
  }

  resolveStatus = (statusId) => {
    switch (statusId) {
      case 1:
        return 'Active'
      case 2:
        return 'Overdue'
      case 3:
        return 'Pending Cancellation'
      case 4:
        return 'Ended'
      default:
        return '';
    }
  }

  render(){
    return (
  <React.Fragment>
    <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text='Loading your content...'
          >
     <Row>
      <Col lg='4'>
     <Card small className="mb-4 p-4 billing col-lg-10">
      <Row>
        <Col lg='12'>
        <p className='billing-title'>
          Current card
        </p>
        <p className='billing-data'>
           {this.state.cardInfo !== null && this.state.cardInfo.cards.length > 0 && <div>{this.state.cardInfo.cards[0].brand} **** **** **** {this.state.cardInfo.cards[0].last4}</div>}
        </p>
        {this.state.cardInfo !== null && this.state.cardInfo.cards.length === 0 && <React.Fragment>
          <FormGroup className="form-group">
              <label htmlFor="feCurrPass">Card Number</label>
              <FormInput
                id="feNewPass"
                type='text'
                placeholder='0000 0000 0000 0000'
                onChange={(text) => this.setState({ccNumber: text.target.value})}
              />
            </FormGroup>
            <FormGroup className="form-group">
              <label htmlFor="feCurrPass">Expiry date</label>
              <FormInput
                id="feNewPass"
                type='text'
                placeholder='YYYY-MM'
                onChange={(text) => this.setState({ccExpiration: text.target.value})}
              />
            </FormGroup>
            <FormGroup className="form-group">
              <label htmlFor="feCurrPass">CVV</label>
              <FormInput
                id="feNewPass"
                type='text'
                placeholder='000'
                onChange={(text) => this.setState({ccCVV: text.target.value})}
              />
            </FormGroup>
            <Button
                    theme="accent"
                    className='btn-orange'
                    onClick={this.addCard}
                  >
                    Add
                </Button>
          </React.Fragment>
        }
        {this.state.cardInfo !== null && this.state.cardInfo.cards.length > 0 && <Button
                    theme="accent"
                    className='btn-orange'
                    onClick={this.deleteCard}>
                    Remove
                </Button>}
        </Col>
      </Row>
      <br/>
      {this.state.cardError && <Alert className="mb-0">
                  <i className="fa fa-error mx-2"></i>{this.state.cardErrorInfo}</Alert>}
    </Card>
    </Col>
    </Row>
    <Card small className="mb-4 p-4 billing">
      <Row>
        <Col lg='12'>
          <Row className='line'>
            <Col lg='6' md='12'>
              <p className='billing-title'>
                Current Plan
              </p>
              <p className={`billing-plan`}>
               {this.state.currentProduct && <React.Fragment>{this.state.currentProduct[0].name}</React.Fragment>}
               <Badge pill className={this.state.subscription && this.state.subscription.subscriptionStatusId === 1 ? `card-post__category badge-content-type space-left-10` : `card-post__category badge-content-tag space-left-10`}>
                {this.state.subscription && this.resolveStatus(this.state.subscription.subscriptionStatusId)}
                </Badge>
              </p>
              <br/>
              <p className='billing-title'>
                Change plans on next billing cycle
              </p>
              <p>
                <br/>
                <fieldset>
                {this.state.subscription && this.state.products && this.state.products.filter(p => p.name !== "Founding").map(product => (
                    <FormCheckbox checked={product.id === (this.state.newPlanId ? this.state.newPlanId : this.state.subscription.productId)} onChange={() => this.selectPlan(product.id)}><b>{product.name}</b> - {product.description}</FormCheckbox>
                ))}
                </fieldset>
              </p>
              <Button
                    theme="accent"
                    className='btn-orange'
                    onClick={this.changePlan}
                  >
                    Change or renew plan
                </Button>
              <br/> <br/>
              <Col lg='12'>
                {this.state.btcPaymentDialog && <iframe src={this.state.btcPaymentUrl} style={{height: 750, width: "100%", border: "none"}}></iframe>}
              </Col>
            </Col>
            <Col lg='6' md='12'>
            {this.state.subscription && this.state.subscription.nextRenewalDate && <React.Fragment><p className='billing-title'>
                Next Payment
              </p>
              <p className='billing-data'>
                $ {this.state.subscription && <React.Fragment>{this.state.subscription.cost}</React.Fragment>}
              </p></React.Fragment>}
              {this.state.subscription && this.state.subscription.nextRenewalDate && <React.Fragment><p className='billing-title'>
                Next Renewal Date
              </p>
              <p className='billing-data'>
                {this.state.subscription && <React.Fragment>{this.state.subscription.nextRenewalDate}</React.Fragment>}
              </p></React.Fragment>}
              {this.state.subscription && this.state.subscription.cancellationDate && <React.Fragment><p className='billing-title'>
                Cancelation Date
              </p>
              <p className='billing-data'>
                {this.state.subscription && <React.Fragment>{this.state.subscription.cancellationDate}</React.Fragment>}
              </p></React.Fragment>}
            </Col>
          </Row>
        </Col>
        <Col lg='12'>
          <Row>
            <Col lg='2'>
              {this.state.subscription && <p className='billing-title'>
                Payment Method (default: {this.state.subscription.renewalPaymentMethodId ? 'Credit Card' : 'Bitcoin'})
              </p>}
              <p className='billing-data'>
                  <FormSelect id="feInputState" onChange={this.changePaymentMethod}>
                    <option>Choose...</option>
                    <option value={'cc'}>Credit Card</option>
                    <option value={'bitcoin'}>Bitcoin</option>
                  </FormSelect>
              </p>
            </Col>
            <Col lg='6'>
              <p className='billing-text'>
              </p>
            </Col>
           
          </Row>
        </Col>
        {this.state.planChangeOk && <Alert className="mb-0">
                  <i className="fa fa-info mx-2"></i>Your payment has been processed succesfully! Please refresh the page.</Alert>}
        {this.state.planChangeError && <Alert className="mb-0">
                  <i className="fa fa-error mx-2"></i>{this.state.planChangeErrorMessage}</Alert>}
      </Row>
    </Card>

    <Card small className="mb-4 p-4 billing">
      <SimpleTable
        tableContent={this.state.history}
        tableHeadings={tableHeadings}
      />
    </Card>
    </LoadingOverlay>
  </React.Fragment>)}}

Billing.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Billing.defaultProps = {
};

export default withStorage(Billing);
