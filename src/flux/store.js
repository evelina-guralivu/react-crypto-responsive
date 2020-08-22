import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItemsAdmin from "../data/sidebar-nav-items-admin";
import getSidebarNavItemsPublisher from "../data/sidebar-nav-items-publisher";
import getSidebarNavItemsSubscriber from "../data/sidebar-nav-items-subscriber";
import getSidebarNavItemsAnon from "../data/sidebar-nav-items-anon";

let _store = {
  menuVisible: false,
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));

  }

  load = (key) => {
    if (localStorage.getItem(key) !== undefined) {
      return JSON.parse(localStorage.getItem(key)); 
    }
    return null;
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    const user = this.load("user");
    if(user !== null){
      switch(user.userRoleId){
        case 1:
          return getSidebarNavItemsAdmin();
        case 2:
          return getSidebarNavItemsSubscriber();
        case 3:
            return getSidebarNavItemsPublisher();
        default:
            return getSidebarNavItemsSubscriber();
      }
    }else{
      return getSidebarNavItemsAnon();
    }
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
