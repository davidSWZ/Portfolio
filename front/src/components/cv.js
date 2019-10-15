import React, {Component} from 'react';
import axios from 'axios';

export default class CV extends Component {

  constructor(props) {
    super(props);

    this.state={
      experience : []
    }
  }

  componentDidMount() {
    let that = this;

    axios.get('http://localhost:4000/experience')
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
      <section id='cv' className='section text-center'>
        <div className="container">
          <h1 className="section-title"> Curriculum </h1>
          {
            this.state.experience.map((experience, index) => {
              return(
                <div key={index} className="row">
                  <div className="cv-year col-2">
                    <p>{experience.when}</p>
                  </div>
                  <div className="col-2">
                    <p>{experience.title}</p>
                    <p>{experience.where}</p>
                    <p>{experience.description}</p>
                  </div>

                </div>
              )
            })
          }
        </div>
      </section>
    )
  }
}
