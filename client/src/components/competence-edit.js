import React, {Component} from 'react';
import axios from 'axios';
import SaveBtn from './saveBtn';
import SuppBtn from './suppBtn';
import AddBtn from './addBtn';

export default class CompetenceEdit extends Component {

  constructor(props) {
    super(props);

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

  addCompetence = () => {
    this.setState({
      competence: [...this.state.competence, {value:'', icon:this.state.icon, modified:false}],
    });
  }

  onChangeCompetenceValue(e, index) {
    const newCompetenceArray = this.state.competence.slice();
    newCompetenceArray[index].value = e.target.value;
    newCompetenceArray[index].modified = true;
    this.setState({competence: newCompetenceArray});
  }

  onChangeCompetenceIcon(e, index) {
    const newCompetenceArray = this.state.competence.slice();
    newCompetenceArray[index].icon = e.target.value;
    newCompetenceArray[index].modified = true;
    this.setState({competence: newCompetenceArray});
  }

  handleRemove(e, index) {
    const newCompetenceArray = this.state.competence.slice();
    axios.delete(process.env.REACT_APP_API_URL + 'competence/delete', {data:{Value:this.state.competence[index].value}})
    .then(
      newCompetenceArray.splice(index, 1)
    )
    .then(
      this.setState({competence: newCompetenceArray})
    )
  }

  onSubmit(e, index) {
    e.preventDefault();
    let competence = this.state.competence[index];
    const newCompetenceArray = this.state.competence.slice();

    axios.post(process.env.REACT_APP_API_URL + 'competence/add', competence)
    .then(res => {
        newCompetenceArray[index].modified = false;
        this.setState({competence: newCompetenceArray});
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
