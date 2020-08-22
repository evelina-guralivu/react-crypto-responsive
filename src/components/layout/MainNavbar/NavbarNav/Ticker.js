import React from "react";
import { NavItem, NavLink } from "shards-react";
import Websocket from 'react-websocket';

export default class Ticker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ETHUSD: 0,
      XBTUSD: 0,
      LTCM20: 0,
    }
  }

  componentDidMount = () => {

  }

  handleClose = () => {
  }

  handleOpen = () => {
    this.sendMessage({
      op: "subscribe",
      args: ["quoteBin1m:XBTUSD", "quoteBin1m:LTCM20", "quoteBin1m:ETHUSD"]
    })
  }

  handleData = (data) => {
    let result = JSON.parse(data);
    if(!!result.data && result.data.length > 0){
      let pairData = result.data[0];
      let symbol = pairData.symbol;
      if(symbol === "ETHUSD"){
          this.setState({
            ETHUSD: pairData.bidPrice
          })
      }
      if(symbol === "LTCM20"){
          this.setState({
            LTCM20: (pairData.bidPrice * this.state.XBTUSD).toFixed(2)
          })
      }
      if(symbol === "XBTUSD"){
          this.setState({
            XBTUSD: pairData.bidPrice
          })
      }
    }
  }

  sendMessage = (message) => {
    this.refWebSocket.sendMessage(JSON.stringify(message));
  }

  render() {
    return (
      <React.Fragment>
        <NavItem className="border-right d-none d-md-flex d-lg-flex" style={{minWidth: "9rem", justifyContent: "center", alignItems: "center"}}>
          <NavLink
          >
              BTC: <i className="material-icons" style={{color: "green"}}>&#xe5d8;</i> ${this.state.XBTUSD}
          </NavLink>
        </NavItem>
        <NavItem className="border-right d-none d-md-flex d-lg-flex" style={{minWidth: "9rem", justifyContent: "center", alignItems: "center"}}>
          <NavLink>
              ETH: <i className="material-icons" style={{color: "green"}}>&#xe5d8;</i> ${this.state.ETHUSD}
          </NavLink>
        </NavItem>
        <NavItem className="border-right d-none d-md-flex d-lg-flex" style={{minWidth: "9rem", justifyContent: "center", alignItems: "center"}}>
          <NavLink
          >
              LTC: <i className="material-icons" style={{color: "red"}}>&#xe5db;</i> ${this.state.LTCM20}
          </NavLink>
        </NavItem>
           <Websocket url='wss://www.bitmex.com/realtime'
              onMessage={this.handleData.bind(this)}
               onOpen={this.handleOpen} onClose={this.handleClose}
                reconnect={true} debug={true}
                ref={Websocket => {
                  this.refWebSocket = Websocket;
                }}/>
      </React.Fragment>
    );
  }
}
