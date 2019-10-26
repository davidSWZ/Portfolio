import React, {Component} from 'react';
import axios from 'axios';

class Icon extends Component{
  render() {
    return(
      <div key={this.props.index} className="m-5 text-center">
        <div className='icon-circle'>
          <div className='icon'>
            {this.props.icon}
          </div>
        </div>
        <p className="icon-title">{this.props.value}</p>
      </div>
    )
  }
}

export default class Competence extends Component {

  constructor(props) {
    super(props);
    this.state={
      competence:[],
    }
  }

  componentDidMount() {
    let that = this;

    axios.get('http://localhost:4000/competence')
      .then(res => {
        res.data.forEach(function(competence) {
          that.setState({competence: [...that.state.competence, {value:competence.value, icon:competence.icon}]})
        });
      })
      .catch(err => {
        console.log('A problem occured')
      });
  }

  render() {

    return (
      <section id='competence' className='section text-center'>
        <div className='container'>
          <h2 className='section-title'> Compétences </h2>
          <div className='row text-center'>
            {
              this.state.competence.map((competence, index) => {
                var icon =<i class={competence.icon} size='7x'></i>;
                return(
                  <Icon icon={icon} index={index} value={competence.value}/>
                )
              })
            }
          </div>
        </div>
      </section>
    )
  }
}
