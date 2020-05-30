import React, {Component} from 'react';
import axios from 'axios';
import AnimateOnScroll from './animate-on-scroll';

//Génère la partie CV de la frontpage
export default class CV extends Component {

  constructor(props) {
    super(props);

    this.state={
      experience : []
    }
  }

  //Recupère les expériences du CV depuis la BD
  componentDidMount() {
    let that = this;

    axios.get(process.env.REACT_APP_API_URL + 'experience')
      .then(res => {
        res.data.forEach(function(experience) {
          that.setState({experience: [...that.state.experience,
            { title:experience.title,
              where:experience.where,
              when:experience.when,
              description:experience.description
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
      // Titre de la section
      <section id='cv' className='section text-center'>
        <div className="container">
          <h1 className="section-title"> Curriculum </h1>
          {
            // Pour chaque expérience, génère le rendu
            this.state.experience.map((experience, index) => {
              return(
                <AnimateOnScroll key={index}>
                  <div key={index} className="row mt-5">
                    <div className="cv-year col-3">
                      <p>{experience.when}</p>
                    </div>
                    <div className="col-9 contain-xp">
                      <p className="cv-title">{experience.title}</p>
                      <p className="cv-lieu">{experience.where}</p>
                      <p>{experience.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              )
            })
          }

          {/* Télechargement du CV PDF */}
          <p className='mt-5 font-weight-bold'> Télécharger le CV </p>
          <div className='d-flex justify-content-around pb-5'>

              {/* CV français */}
              <div className='download-btn'>
                <a href="CV_d.swiatkiewiez.pdf" download> <i className="fas fa-download"></i> </a>
                <p className='mt-4 download-btn-text1'>Français</p>
              </div>
              
              {/* CV anglais */}
              <div className='download-btn'>
                <a href="CV_david_swiatkiewiez_english.pdf" download> <i className="fas fa-download"></i> </a>
                <p className='mt-4 download-btn-text2'>English</p>
              </div>
          </div>
        </div>
      </section>
    )
  }
}
