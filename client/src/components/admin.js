import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import HomeEdit from './home-edit';
import CompetenceEdit from './competence-edit';
import CVEdit from './cv-edit';
import PortfolioEdit from './portfolio-edit';
import FooterAdmin from './footer-admin';

export default class Admin extends Component {
  render () {
    if(!this.props.loggedIn) {
      return <Redirect to='/' />;
    }

    return(
      <div className="adminBackground">
        <div className='container text-center'>
          <HomeEdit/>
          <CompetenceEdit/>
          <CVEdit/>
          <PortfolioEdit/>
        </div>
        <FooterAdmin/>
      </div>
    )
  }
}
