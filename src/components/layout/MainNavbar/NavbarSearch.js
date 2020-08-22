import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";
import { Redirect } from "react-router-dom";

export default class NavbarSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  changeSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  doSearch = (event) => {
    event.preventDefault();
    this.setState({
      redirect: true,
      pathname: '/search',
      state: {
        term: this.state.searchTerm
      }
    })
  }

  render() {
    return (
      <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex" onSubmit={this.doSearch}>
        {this.state.redirect && <Redirect
          to={{
            pathname: this.state.pathname,
            state: this.state.state
          }}
        />}
        <InputGroup seamless className="ml-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">search</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput
            className="navbar-search"
            placeholder="Search for something..."
            value={this.state.searchTerm}
            onChange={this.changeSearchTerm}
          />
        </InputGroup>
      </Form>
    )}
}
