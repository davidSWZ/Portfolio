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
        res.data.forEach(function(projet) {
          that.setState({projets: [...that.state.projets,
            { title:projet.title,
              description:projet.description,
              photo:projet.photo,
              techno:projet.techno,
              lienProjet:projet.lienProjet,
              lienGithub:projet.lienGithub
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
      <section id='portfolio' className='section text-center'>
      <div className="container">
        <h2 className="section-title"> Portofolio </h2>
        {
          this.state.projets.map((projet, index) => {
            return(
              <div key={index}>
                <p>{projet.title}</p>
                <p>{projet.description}</p>
                <p>{projet.photo}</p>
                <p>{projet.techno}</p>
                <p>{projet.lienProjet}</p>
                <p>{projet.lienGithub}</p>
              </div>
            )
          })
        }
      </div>

      </section>
    )
  }
}
