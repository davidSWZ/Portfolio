import React, {Component} from 'react';
import axios from 'axios';
import AnimateOnScroll from './animate-on-scroll';

export default class Portofolio extends Component {

  constructor(props) {
    super(props);

    this.state={
      projets:[]
    }
  }

  componentDidMount() {
    let that = this;

    axios.get(process.env.REACT_APP_API_URL + 'portfolio')
      .then(res => {

        res.data.forEach(function(projet) {
          that.setState({projets: [...that.state.projets,
            { title:projet.title,
              description:projet.description,
              photo:projet.photo,
              techno:projet.techno,
              lienProjet:projet.lienProjet,
              lienGithub:projet.lienGitHub
            }
          ]})
        });
      })
      .catch(err => {
        console.log('A problem occured')
      });
  }

  render() {
    return (
      <section id='portfolio' className='section text-center mb-5'>
        <div className="container">
          <h2 className="section-title"> Portofolio </h2>
          <div className="project-display d-flex justify-content-center">
          {
            this.state.projets.map((projet, index) => {
              return(
                <AnimateOnScroll>

                <div key={index} className="project-container">
                  <div className="portfolio-content">
                    <p className="projet-title">{projet.title}</p>
                    <p className="projet-description">{projet.description}</p>
                    <p>{projet.photo}</p>
                    <p className='projet-logo'><i className="fas fa-code"></i></p>
                    <p className='projet-techno'>{projet.techno}</p>
                    <div className='d-flex justify-content-center'>
                      <div className="projet-lien">
                        <a href={projet.lienProjet} target="_blank"><i className="far fa-eye"></i> projet</a>
                      </div>
                      <div className="projet-lien">
                        <a href={projet.lienGithub} target="_blank"><i className="far fa-eye"></i> code</a>
                      </div>
                    </div>
                  </div>
                </div>
                </AnimateOnScroll>

              )
            })
          }
          </div>
        </div>
      </section>
    )
  }
}
