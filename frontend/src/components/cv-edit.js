import React, {Component} from 'react';
import axios from 'axios';
import SaveBtn from './saveBtn';
import SuppBtn from './suppBtn';
import AddBtn from './addBtn';

export default class CVEdit extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.addExperience = this.addExperience.bind(this);
    this.onChangeExperienceTitle = this.onChangeExperienceTitle.bind(this);
    this.onChangeExperienceWhere = this.onChangeExperienceWhere.bind(this);
    this.onChangeExperienceWhen = this.onChangeExperienceWhen.bind(this);
    this.onChangeExperienceDescription = this.onChangeExperienceDescription.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

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


  addExperience() {
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

  onChangeExperienceTitle(e, index) {
    this.state.experience[index].title = e.target.value;
    this.state.experience[index].modified = true;
    this.setState({experience:this.state.experience});
  }

  onChangeExperienceWhere(e, index) {
    this.state.experience[index].where = e.target.value;
    this.state.experience[index].modified = true;
    this.setState({experience:this.state.experience});
  }

  onChangeExperienceWhen(e, index) {
    this.state.experience[index].when = e.target.value;
    this.state.experience[index].modified = true;
    this.setState({experience:this.state.experience});
  }

  onChangeExperienceDescription(e, index) {
    this.state.experience[index].description = e.target.value;
    this.state.experience[index].modified = true;
    this.setState({experience:this.state.experience});
  }

  handleRemove(e, index) {
    axios.delete('http://localhost:4000/experience/delete', {data:{id:this.state.experience[index].id}})
    .then(
      this.state.experience.splice(index, 1)
    )
    .then(
      this.setState({ experience : this.state.experience})
    )
  }



  onSubmit(e, index) {
    e.preventDefault();
    let experience = this.state.experience[index];

    axios.post('http://localhost:4000/experience/add', experience)
    .then(res => {
      this.state.experience[index].modified = false;
      this.setState({experience: this.state.experience});
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    return (
      <section id='cv'>
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
                              onChange={(e) => {this.onChangeExperienceTitle(e, index)}}
                              />
                      <label htmlFor='newWhere' className='col-form-label section-edit-label col-sm-2'>Oú</label>

                      <input  type='text'
                              id='newWhere'
                              className='form-control col-sm-9 input'
                              value={exp.where}
                              onChange={(e) => {this.onChangeExperienceWhere(e, index)}}
                              />
                      <label htmlFor='newWhen' className='col-form-label section-edit-label col-sm-2'>Quand</label>

                      <input  type='text'
                              id='newWhen'
                              className='form-control col-sm-9 input'
                              value={exp.when}
                              onChange={(e) => {this.onChangeExperienceWhen(e, index)}}
                              />
                      <label htmlFor='newDescription' className='col-form-label section-edit-label col-sm-2'>Description</label>
                      <textarea type='text'
                                id='newDescription'
                                className='form-control col-sm-9 input'
                                value={exp.description}
                                onChange={(e) => {this.onChangeExperienceDescription(e, index)}}
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
