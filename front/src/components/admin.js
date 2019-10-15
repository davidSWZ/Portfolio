import React, {Component} from 'react';

import HomeEdit from './home-edit';
import CompetenceEdit from './competence-edit';
import CVEdit from './cv-edit';
import PortfolioEdit from './portfolio-edit';
import FooterAdmin from './footer-admin';

export default class Admin extends Component {
  
  render () {
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
