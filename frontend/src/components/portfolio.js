import React, {Component} from 'react';
import axios from 'axios';

export default class Portofolio extends Component {

  constructor(props) {
    super(props);

    this.state={
      projets:[]
    }
  }

  componentDidMount() {
    let that = this;

    axios.get('http://localhost:4000/portfolio')
      .then(res => {
        console.log(res.data)

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
        console.log(this.state.projets)
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
          <div className="project-display">
          {
            this.state.projets.map((projet, index) => {
              return(
                <div key={index} className="project-container">
                  <div className="portfolio-content">
                    <p className="projet-title">{projet.title}</p>
                    <p>{projet.description}</p>
                    <p>{projet.photo}</p>
                    <p className='projet-logo'><i class="fas fa-code"></i></p>
                    <p className='projet-techno'>{projet.techno}</p>
                    <div className='d-flex justify-content-center'>
                      <div className="projet-lien">
                        <a href={projet.lienProjet} target="_blank"><i class="far fa-eye"></i> projet</a>
                      </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <div className="projet-lien">
                        <a href={projet.lienGithub} target="_blank"><i class="far fa-eye"></i> code</a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      </section>
    )
  }
}
