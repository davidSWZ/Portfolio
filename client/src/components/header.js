import React, {Component} from 'react';
import { HashLink as RouterLink } from 'react-router-hash-link';
import { Link, animateScroll as scroll } from "react-scroll";
import $ from "jquery";
import { CSSTransition } from 'react-transition-group';
import Signin from './signin';

export default class Header extends Component {

  constructor(props) {
    super(props);

    this.showLogInForm = this.showLogInForm.bind(this);
    this.removeLogInForm = this.removeLogInForm.bind(this);

    this.state = {
      isTop:true,
      showLogIn:false
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop= window.scrollY < 10;
      if(isTop !== this.state.isTop) {
        this.setState({isTop: isTop});
        this.handleNavBarAspect()
      }
    })
  }

  handleNavBarAspect() {
    if(this.state.isTop) {
      $(".navbar").removeClass("NavBarScrolling");
      $(".navbar-brand").removeClass("NavBarBrandScrolling");
    } else{
      $(".navbar").addClass("NavBarScrolling");
      $(".navbar-brand").addClass("NavBarBrandScrolling");
    }
  }

  showLogInForm() {
    this.setState({showLogIn:true});
  }

  removeLogInForm() {
    this.setState({showLogIn:false});
  }

  render() {
    return (
      <header>


        <nav className='navbar navbar-expand-lg fixed-top mt-3 navbar-light'>
          <div className="container">
            <RouterLink to="/" className='navbar-brand'> <span className="nom">David</span><span className="prenom">SWIATKIEWIEZ</span> </RouterLink>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className='collapse navbar-collapse ancre' id="navbarTogglerDemo02">
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link
                    to='competence'
                    className='nav-link'
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration= {400}
                    > COMPETENCES
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='cv'
                    className='nav-link'
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration= {400}
                    > CURRICULUM
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to="portfolio"
                    className='nav-link'
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration= {400}
                    >PORTFOLIO
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link
                    to='contact'
                    className='nav-link '
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration= {400}
                    > CONTACT
                  </Link>
                </li>
              </ul>
            </div>
            <div className='collapse navbar-collapse justify-content-end'>
              <button className='nav-link ancre admin-btn' onClick={this.showLogInForm}><i className="fas fa-user-lock" ></i> ADMIN </button>
            </div>
            <div className='collapse navbar-collapse justify-content-end'>
              <button className='nav-link ancre admin-btn' onClick={this.showLogInForm}><i className="fas fa-user-lock" ></i> DECONNECTION </button>
            </div>
          </div>
        </nav>

        <CSSTransition
          in={this.state.showLogIn}
          timeout={300}
          classNames="login"
          unmountOnExit
          >
          <Signin removeLogIn={this.removeLogInForm}/>
        </CSSTransition>
      </header>
    )
  }
}
