import React, {Component} from 'react';
import { Link } from "react-scroll";
import axios from 'axios';
import '../styles/site.css';
import logo from '../styles/images/logo-swz.png';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state= {
      home_title:'',
      home_description:''
    }
  }

  componentDidMount() {
    axios.get("http://localhost:4000/home")
    .then(res => {
      this.setState({
        home_title:res.data[0].home_title,
        home_description:res.data[0].home_description
      })
      console.log(res.data)
    })
    .catch(function (err) {
      console.log(err);
    })
  }

  render() {
    return (
      <section id='home' className='section '>
        <div className='container text-center'>
          <div className="animation-home">
            <h1 className="site-title" dangerouslySetInnerHTML={{ __html: this.state.home_title }}></h1>
            <h2 className='site-sous-titre'>{this.state.home_description}</h2>
          </div>
          <div className="animation-logo">
            <h1 className="name">David<span className="surname">SWIATKIEWIEZ</span></h1>
            <div className='logo-container'>
              <a href='https://github.com/davidSWZ' target="_blank">
                <i className="fab fa-github-square logo"></i>
              </a>
              <a href='https://www.linkedin.com/in/david-swiatkiewiez-7380b876/?originalSubdomain=fr'                target="_blank">
                <i className="fab fa-linkedin logo"></i>
              </a>
            </div>
          </div>
          <Link
            to='competence'
            spy={true}
            smooth={true}
            offset={0}
            duration= {400}
            ><i className="fas fa-angle-double-down"></i>
          </Link>
        </div>
      </section>
    )
  }
}
