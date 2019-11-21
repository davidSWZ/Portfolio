import React, {Component} from 'react';
import axios from 'axios';
import SaveBtn from './saveBtn';
import SuppBtn from './suppBtn';
import AddBtn from './addBtn';

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

    axios.get(process.env.REACT_APP_API_URL+'competence')
      .then(res => {
        res.data.forEach(function(competence) {
          that.setState({competence: [...that.state.competence, {value:competence.value, icon:competence.icon, id:competence._id}]})
        });
      })
      .catch(err => {
        console.log('A problem occured')
      });
  }

  addCompetence() {
    this.setState({
      competence: [...this.state.competence, {value:'', icon:this.state.icon, modified:false}],
    });
  }

  onChangeCompetenceValue(e, index) {
    this.state.competence[index].value = e.target.value;
    this.state.competence[index].modified = true;
    this.setState({competence: this.state.competence})
  }

  onChangeCompetenceIcon(e, index) {
    this.state.competence[index].icon = e.target.value;
    this.state.competence[index].modified = true;

    this.setState({competence: this.state.competence})
  }

  handleRemove(e, index) {
    axios.delete('http://localhost:4000/competence/delete', {data:{Value:this.state.competence[index].value}})
    .then(
      this.state.competence.splice(index, 1)
    )
    .then(
      this.setState({ competence : this.state.competence})
    )
  }

  onSubmit(e, index) {
    e.preventDefault();
    let competence = this.state.competence[index];
    axios.post('http://localhost:4000/competence/add', competence)
    .then(res => {
        this.state.competence[index].modified = false;
        this.setState({competence: this.state.competence});
    })
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
                    <div className="contain-btn">
                      <SaveBtn modified={competence.modified} onSubmit={(e) => this.onSubmit(e, index)}/>
                      <SuppBtn handleRemove={(e) => this.handleRemove(e, index)} />
                    </div>
                </div>
              )
            })
          }
          <AddBtn addelement= {this.addCompetence} />
        </div>
      </section>
    )
  }
}
