import React, {Component} from 'react';
import axios from 'axios';

export default class CompetenceEdit extends Component {

  constructor(props) {
    super(props);

    this.addCompetence = this.addCompetence.bind(this);
    this.onChangeCompetenceValue = this.onChangeCompetenceValue.bind(this);
    this.onChangeCompetenceIcon = this.onChangeCompetenceIcon.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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

  addCompetence() {
    this.setState({
      competence: [...this.state.competence, {value:'', icon:this.state.icon}],
    });
  }

  onChangeCompetenceValue(e, index) {
    this.state.competence[index].value = e.target.value;

    this.setState({competence: this.state.competence})
  }

  onChangeCompetenceIcon(e, index) {
    this.state.competence[index].icon = e.target.value;

    this.setState({competence: this.state.competence})
  }

  handleRemove(index) {
    this.state.competence.splice(index, 1)

    this.setState({ competence : this.state.competence})
  }

  onSubmit(e) {
    let competences = this.state.competence;

    axios.delete('http://localhost:4000/competence/delete', {data:{}})
      .then(
        competences.forEach(function(competence) {
          let competenceAdded = {
            value : competence.value,
            icon : competence.icon
          }
          axios.post('http://localhost:4000/competence/add', competenceAdded)
          .then(res => {console.log(competenceAdded)})
          .catch(function(err) {
            console.log(err);
          })
        })
      )
      .catch(function(err) {
        console.log(err);
      })
  }

  render() {
    return (
      <section id='competence'>
        <div className="section-edit">
          <h2 className="section-edit-title">COMPETENCES</h2>
          {
            this.state.competence.map((competence, index) => {
              return(
                <div key={index} className='mb-2 form-group row'>
                  <label  className='col-form-label section-edit-label col-sm-2'> Icône </label>
                  <input  value={competence.icon}
                          className='form-control col-sm-9 input'
                          placeholder='Exemple: fab fa-facebook'
                          onChange={(e) => this.onChangeCompetenceIcon(e, index)}
                          />
                  <label  className='col-form-label section-edit-label col-sm-2'> Nom </label>
                  <input  value={competence.value}
                          className='form-control col-sm-9 input'
                          placeholder='Compétence'
                          onChange={(e) => this.onChangeCompetenceValue(e, index)}
                          />
                    <button className='supp-btn'
                            onClick={() => this.handleRemove(index)}
                            > Supprimer
                    </button>
                </div>
              )
            })
          }
          <button className='add-btn'
                  onClick={this.addCompetence}
                  >+
          </button>
          <div>
            <button className='enregistrer-btn'
                    onClick={this.onSubmit}
                    >Enregistrer
            </button>
          </div>
        </div>
      </section>
    )
  }
}
