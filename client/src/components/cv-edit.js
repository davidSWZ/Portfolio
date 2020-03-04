import React, {Component} from 'react';
import axios from 'axios';
import SaveBtn from './saveBtn';
import SuppBtn from './suppBtn';
import AddBtn from './addBtn';

export default class CVEdit extends Component {

  constructor(props) {
    super(props);

    this.state={
      experience : []
    }
  }

  componentDidMount() {
    let that = this;

    axios.get(process.env.REACT_APP_API_URL + 'experience')
      .then(res => {
        res.data.forEach(function(experience) {
          that.setState({experience: [...that.state.experience,
            { title:experience.title,
              where:experience.where,
              when:experience.when,
              description:experience.description,
              id:experience._id
            }
          ]})
        });
      })
      .catch(err => {
        console.log('A problem occured')
      });
  }


  addExperience = () => {
    this.setState(
      {experience: [...this.state.experience, {
        title:'',
        where:'',
        when:'',
        description:'',
        id:null,
        modified: false
      }]})
  }

  onChange(e, index) {
    const eTargetName = e.target.name;
    const newExpArray = this.state.experience.slice();
    newExpArray[index][eTargetName] = e.target.value;
    newExpArray[index].modified = true;
    this.setState({experience: newExpArray});
  }

  handleRemove(e, index) {
    const newExpArray = this.state.experience.slice();
    axios.delete(process.env.REACT_APP_API_URL + 'experience/delete', {data:{id:this.state.experience[index].id}})
    .then(
       newExpArray.splice(index, 1)
    )
    .then(
      this.setState({experience: newExpArray})
    )
  }

  onSubmit(e, index) {
    e.preventDefault();
    const experience = this.state.experience[index];
    const newExpArray = this.state.experience.slice();
    axios.post(process.env.REACT_APP_API_URL + 'experience/add', experience)
    .then(res => {
      newExpArray[index].modified = false;
      this.setState({experience: newExpArray});
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    return (
      <section id='cv-edit'>
        <div className="section-edit">
          <h2 className='section-edit-title'> CURRICULUM </h2>
            {
              this.state.experience.map((exp, index) => {
                return(
                  <div key={index} className='mb-2 form-group row'>
                      <label htmlFor='newTitle' className='col-form-label section-edit-label col-sm-2'>Titre du poste</label>

                      <input  type='text'
                              id='newTitle'
                              className='form-control col-sm-9 input'
                              value={exp.title}
                              name="title"
                              onChange={(e) => {this.onChange(e, index)}}
                              />
                      <label htmlFor='newWhere' className='col-form-label section-edit-label col-sm-2'>Oú</label>

                      <input  type='text'
                              id='newWhere'
                              className='form-control col-sm-9 input'
                              value={exp.where}
                              name="where"
                              onChange={(e) => {this.onChange(e, index)}}
                              />
                      <label htmlFor='newWhen' className='col-form-label section-edit-label col-sm-2'>Quand</label>

                      <input  type='text'
                              id='newWhen'
                              className='form-control col-sm-9 input'
                              value={exp.when}
                              name="when"
                              onChange={(e) => {this.onChange(e, index)}}
                              />
                      <label htmlFor='newDescription' className='col-form-label section-edit-label col-sm-2'>Description</label>
                      <textarea type='text'
                                id='newDescription'
                                className='form-control col-sm-9 input'
                                value={exp.description}
                                name= "description"
                                onChange={(e) => {this.onChange(e, index)}}
                              >
                      </textarea>

                      <div className="contain-btn">
                        <SaveBtn modified={exp.modified} onSubmit={(e) => this.onSubmit(e, index)}/>
                        <SuppBtn handleRemove={(e) => this.handleRemove(e, index)} />
                      </div>
                  </div>
                )
              })
            }
          <AddBtn addelement= {this.addExperience} />
        </div>
      </section>
    )
  }
}
