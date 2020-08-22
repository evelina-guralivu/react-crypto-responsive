import React from "react";
import {
  Col,
  Card,
  CardHeader,
  Row,
} from "shards-react";
import { Link } from "react-router-dom";
import { getAllEnabledProducts } from "../../api";

export default class PlansCards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        products: []
    }
  }

  componentDidMount = async () => {
      const products = await getAllEnabledProducts();
      this.setState({products: products.data});
  }

  plan = (billingCycle) => {
      if(billingCycle === 12){
          return {name: 'Yearly', interval: 'per year'};
      }else if(billingCycle === 1){
          return {name: 'Monthly', interval: 'per month'};
      }else if(billingCycle === 3){
          return {name: 'Quarterly', interval: 'per quarter'};
      }
  }

render(){
    return (<Row style={{ paddingBottom: "154px", paddingTop: "120px" }} className="justify-content-md-center">
                {this.state.products.filter(p => p.name !== 'Founding').map((plan, idx) => (
                    <Col md={{size: 3 }} >
                    <Card small style={{ boxShadow: "none", height: 490, marginLeft: "auto" }}>
                        <CardHeader className="text-center">
                            <h5 style={{ color: "#FAA713", fontSize: 14, fontStyle: "normal", textTransform: "uppercase", paddingBottom: 22 }}>{this.plan(plan.billingCycle).name}</h5>
                            {/*<Button pill outline size="sm" className="mb-2" style={{ border: "#BE00FF", backgroundColor: "#F8E5FF", color: "#BE00FF" }}>
                                Most popular
                </Button>*/}
                            <h4 style={{ color: "#29293A", fontSize: 40, lineHeight: "52px", fontStyle: "normal", fontWeight: "bold", textTransform: "uppercase" }}>${plan.cost}</h4>
                            <span className="text-muted d-block mb-2">{this.plan(plan.billingCycle).interval}</span>
                        </CardHeader>
                        <div style={{ paddingLeft: 24, paddingRight: 24, textAlign: "center" }}>{plan.description}</div>
                        <Link to={`/register?planId=${plan.id}`} className="bitcoin-linear" style={style.defaultBtn}>
                            Get Started
                        </Link>
                    </Card>
                </Col>
                ))}
            </Row>)
}
            }

const style = {
    defaultBtn: {
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 25,
        marginTop: 56,
        paddingTop: 10,
        paddingBottom: 16,
        fontSize: 16,
        lineHeight: "28px",
        border: "none",
        color: "white",
        textAlign: "center"
    }
}