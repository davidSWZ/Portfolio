import React, {Component} from 'react';

import Home from './home';
import Competence from './competence';
import CV from './cv';
import Portfolio from './portfolio';
import Contact from './contact';

export default class Site extends Component {

  constructor(props) {
    super(props);

    this.state={
      isDisplayed:false
    }
  }

  componentDidMount() {
    this.setState({isDisplayed : true})
  }

  render () {
    return(
      <>
        <Home/>
        <Competence/>
        <CV/>
        <Portfolio/>
        <Contact/>
      </>
    )
  }
}
