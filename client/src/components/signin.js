import React ,{Component} from 'react';
import { HashLink as RouterLink } from 'react-router-hash-link';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

export default class Signin extends Component {

  constructor(props) {
      super(props);

      this.state={
        username:"",
        password:"",
        attemptFailed:false,
      }

      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChangeUsername(e) {
    this.state.username = e.target.value;

    this.setState({username: this.state.username});
  }

  handleChangePassword(e) {
    this.state.password = e.target.value;

    this.setState({password: this.state.password});
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({attemptFailed:false});
    const adminRequest = {
      username:this.state.username,
      password:this.state.password
    }
    axios.post(process.env.REACT_APP_API_URL + 'signin', adminRequest )
      .then(response => {
        if(response.status==200 && response.data) {
          this.props.removeLogIn();
          this.props.handleAdminBtn();
        }
      })
      .catch((err) => {
        this.setState({attemptFailed:true});
      })
  }

  render() {
    if(this.props.loggedIn) {
      return <Redirect to='/admin' />;
    }

    return(
      <div className="signin" >
        <div className="signInForm">
            <button type="button" className="close-btn" onClick={this.props.removeLogIn} name="button">x</button>
            <div className='login-input text-center'>
              <i className="fas fa-cogs"></i>
              <h2 className="section-edit-title">Log in</h2>
              <form>
                <div className='col-sm-11 '>
                  <input  type='text'
                          id='input-title'
                          name="username"
                          className='form-control input'
                          placeholder='Administrateur'
                          onChange={(e) => this.handleChangeUsername(e)}
                          value={this.state.username}
                          />
                </div>
                <div className='col-sm-11 '>
                  <input  type='password'
                          id='input-title'
                          name="password"
                          className='form-control input'
                          value={this.state.password}
                          onChange={(e) => this.handleChangePassword(e)}
                          placeholder='Mot de passe'
                          />
                </div>

                <CSSTransition
                  in={this.state.attemptFailed}
                  timeout={300}
                  classNames="login"
                  unmountOnExit
                  >
                    <div className='col-sm-11'>
                      <p>You are not the administrator ...</p>
                    </div>
                  </CSSTransition>

                <div className="ok-btn-container">
                  <input type="submit" onClick={(e) => this.handleSubmit(e)} className='ok-btn' value="OK" />
                </div>
              </form>
            </div>
        </div>
      </div>
    )
  }
}
