import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "../node_modules/jquery/dist/jquery.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/App.css';
import './styles/site.css';
import './styles/admin.css';
import './styles/fontawesome/css/all.css';
import Site from './components/site';
import Admin from './components/admin';
import Header from './components/header';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn : false
    }

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);

  }

  handleLogOut() {
    this.setState({loggedIn : false})
  }

  handleLogIn() {
    this.setState({loggedIn : true})
  }

  render() {
    return (

      <Router>
        <Header
          loggedIn={this.state.loggedIn}
          handleLogOut = {this.handleLogOut}
          handleLogIn = {this.handleLogIn}
        />
        <Route
          path='/'
          exact component = {Site}
        />
        <Route
          path='/admin'
          render={(routeProps) => (<Admin {...routeProps} loggedIn={this.state.loggedIn} />)}
        />
      </Router>
    );
  }
}
