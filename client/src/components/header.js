import React, {Component} from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import $ from "jquery";
import { CSSTransition } from 'react-transition-group';
import Signin from './signin';

// Partie d'accueil de la frontpage
export default class Header extends Component {

  constructor(props) {
    super(props);

    this.showLogInForm = this.showLogInForm.bind(this);
    this.removeLogInForm = this.removeLogInForm.bind(this);
    this.logOut = this.logOut.bind(this);
    this.showAdminBtn = this.showAdminBtn.bind(this);
    this.handleAdminBtn = this.handleAdminBtn.bind(this);

    this.state = {
      isTop:true,
      showLogIn:false,
    }
  }

  // Check la position du scroll pour en déduire l'état de la navbar
  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop= window.scrollY < 10;
      if(isTop !== this.state.isTop) {
        this.setState({isTop: isTop});
        this.handleNavBarAspect()
      }
    })

  }

  // Gére l'aspect de la navbar
  handleNavBarAspect() {
    if(this.state.isTop) {
      $(".navbar").removeClass("NavBarScrolling");
      $(".navbar-brand").removeClass("NavBarBrandScrolling");
    } else{
      $(".navbar").addClass("NavBarScrolling");
      $(".navbar-brand").addClass("NavBarBrandScrolling");
    }
  }

  // Affiche le modal pour accéder à l'espace administrateur
  showLogInForm() {
    this.setState({showLogIn:true});
  }

  //Masque le modal pour accéder à l'espace administrateur
  removeLogInForm() {
    this.setState({showLogIn:false});
  }

  // Affiche le bouton connexion ou déconnexion en fonction de si l'utilisateur est connecté ou pas
  showAdminBtn() {
    if(!this.props.loggedIn) {
      return(
        <div className='navbar-collapse justify-content-end'>
          <button className='nav-link ancre admin-btn' onClick={this.showLogInForm}><i className="fas fa-user-lock" ></i> ADMIN </button>
        </div>
      )
    } else {
      return (
        <div className='navbar-collapse justify-content-end'>
          <button className='nav-link ancre admin-btn' onClick={this.logOut}><i className="fas fa-user-lock" ></i> DECONNECTION </button>
        </div>
      )
    }
  }

  //Revoi à la formation login du parent
  handleAdminBtn() {
    this.props.handleLogIn();
  }

  //Revoi à la formation logout du parent
  logOut() {
    this.props.handleLogOut();
  }

  render() {
    return (
      <header>

        <nav className='navbar navbar-expand-lg fixed-top mt-3 navbar-light'>
          <div className="container">

            {/* Affiche mon nom */}
            <div className='navbar-brand'> <span className="nom">David</span><span className="prenom">SWIATKIEWIEZ</span> </div>

            {/* Affiche le titre de mon poste */}
            <button className="navbar-toggler toggler-btn" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon toggler-span"></span>
            </button>

            {/* Navbar */}
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
                <li className='nav-item'>
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
              {this.showAdminBtn()}
            </div>
          </div>
        </nav>

        {/* Gère l'effet de transition du signin formulaire */}
        <CSSTransition
          in={this.state.showLogIn}
          timeout={300}
          classNames="login"
          unmountOnExit
          >
          {/* Formulaire signin */}
          <Signin
            removeLogIn={this.removeLogInForm}
            handleAdminBtn={this.handleAdminBtn}
            loggedIn={this.props.loggedIn}
          />
        </CSSTransition>
      </header>
    )
  }
}
