import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import { getNotifications } from "../../../../api";
import { withRouter, Link } from "react-router-dom";

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      notifications: {}
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  componentDidMount = async () => {
    if(localStorage.getItem("user") !== null){
      let user = JSON.parse(localStorage.getItem("user"));
      const resp = await getNotifications(user.id);
      if(resp !== undefined){
        this.setState({
          notifications: resp.data
        })
       setInterval(async () => {
          const resp = await getNotifications(user.id);
         
          if(resp && resp.data && resp.data.alerts){
            resp.data.alerts.filter(a => a.consumed === false).map(a => {
              if(Notification.permission === "granted") {
                new Notification("New alert on Bitcoin.live!", {
                  body: `New alert by ${a.publisher.name}!`,
                });
              }else{
                Notification.requestPermission(permission => {
                  if(permission === 'granted') {
                    new Notification("New alert on Bitcoin.live!", {
                      body: `New alert by ${a.publisher.name}!`,
                    });
                  }
              });
              }
             
            })
          }
        }, 60000);
      }
    }
  }

  render() {
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            {/*<Badge pill theme="danger">
              2
            </Badge>*/}
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small">
            {this.state.notifications && this.state.notifications.posts && this.state.notifications.posts.map((post, idx) => (
            <DropdownItem>
              
                <div className="notification__icon-wrapper">
                <Link to={post.url}>
                  <div className="notification__icon">
                    <i className="material-icons">&#xe02f;</i>
                  </div>
                </Link>
                </div>
                <div className="notification__content">
                  <span className="notification__category">Blog</span>
                  <p>
                    New post by 
                    <span className="text-success text-semibold"> {post.publisher.name}</span> titled "{post.title}"
                  </p>
                </div>
             
            </DropdownItem>
          ))}
                      {this.state.notifications && this.state.notifications.alerts && this.state.notifications.alerts.map((alert, idx) => (
            <DropdownItem>
              
                <div className="notification__icon-wrapper">
                <Link to={`/alerts/alert.id`}>
                  <div className="notification__icon">
                    <i className="material-icons">&#xe02f;</i>
                  </div>
                </Link>
                </div>
                <div className="notification__content">
                  <span className="notification__category">Alert</span>
                  <p>
                    New alert by 
                    <span className="text-success text-semibold"> {alert.publisher.name}</span>
                  </p>
                </div>
             
            </DropdownItem>
          ))}
           {!this.state.notifications.posts &&
           <DropdownItem>
              <div className="notification__icon-wrapper">
                No new notifications.
              </div>
          </DropdownItem>
           }
           {this.state.notifications.alerts && this.state.notifications.alerts.length === 0 &&
           <DropdownItem>
              <div className="notification__icon-wrapper">
                No new notifications.
              </div>
          </DropdownItem>
           }
          {/*<DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE8D1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">alerts</span>
              <p>
                Bitcoin dumped {" "}
                <span className="text-danger text-semibold">5.52%</span>. It
                could have been worse!
              </p>
            </div>
          </DropdownItem>*/}
         {/* <DropdownItem className="notification__all text-center">
            View all Notifications
        </DropdownItem> */}
        </Collapse>
      </NavItem>
    );
  }
}
