import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormCheckbox,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  componentDidMount = () => {
    let theme = localStorage.getItem("theme");
    if(theme === null){
      localStorage.setItem("theme", "light");
      this.setState({
        theme: "light"
      })
    }else{
      document.documentElement.setAttribute('data-theme', theme);
      this.setState({
        theme: theme
      })
    }
  }

  switchTheme = () => {
    var setTo = this.state.theme === "light" ? "dark" : "light";
    this.setState({
      theme: setTo
    })
    document.documentElement.setAttribute('data-theme', setTo);
    localStorage.setItem("theme", setTo);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  clearSession = () => {
    localStorage.clear();
  }

  render() {
    let user = localStorage.getItem("user");
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        {user !== null && <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
           <img
            className="user-avatar rounded-circle mr-2"
            src={user !== null && JSON.parse(user).avatar !== undefined ? JSON.parse(user).avatar.small : require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />
          {user !== null && <span className="d-none d-md-inline-block">{JSON.parse(user).name}</span>}
        </DropdownToggle>}
        {user == null && <Link id="btn-login" to="/login">Login</Link>}
        {user !== null && <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/user-profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem>
            <FormCheckbox className="no-min-height" toggle small checked={this.state.theme === "dark"} onChange={this.switchTheme}>
              Dark color theme
            </FormCheckbox>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/" className="text-danger" onClick={this.clearSession}>
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>}
      </NavItem>
    );
  }
}
