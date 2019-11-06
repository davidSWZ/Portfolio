import React, {Component} from 'react';
import axios from 'axios';
import SaveBtn from './saveBtn';
import SuppBtn from './suppBtn';
import AddBtn from './addBtn';

export default class PortfolioEdit extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.addProject = this.addProject.bind(this);
    this.onChangeProjetTitle = this.onChangeProjetTitle.bind(this);
    this.onChangeProjetDescription = this.onChangeProjetDescription.bind(this);
    this.onChangeProjetPhoto = this.onChangeProjetPhoto.bind(this);
    this.onChangeProjetTechno = this.onChangeProjetTechno.bind(this);
    this.onChangeProjetLien = this.onChangeProjetLien.bind(this);
    this.onChangeGitHubLien = this.onChangeGitHubLien.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.state={
      projets:[],
      photo:''
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
              lienGithub:projet.lienGithub,
              id:projet._id,
              modified:false
            }
          ]})
        });
      })
      .catch(err => {
        console.log('A problem occured')
      });
  }

  addProject() {
    this.setState({projets:[...this.state.projets,
      {
        title:'',
        description:'',
        photo:'',
        techno:'',
        lienProjet:'',
        lienGitHub:'',
        id:null,
        modified:false
      }]})
  }

  onChangeProjetTitle(e, index) {
    this.state.projets[index].title= e.target.value;
    this.state.projets[index].modified = true;
    this.setState({projets:this.state.projets});
  }

  onChangeProjetDescription(e, index) {
    this.state.projets[index].description= e.target.value;
    this.state.projets[index].modified = true;
    this.setState({projets:this.state.projets});
  }

  onChangeProjetPhoto(e, index) {
    const files = Array.from(e.target.files)
    const formData = new FormData()

    files.forEach((file, i) => {
       formData.append(i, file)
    })

    let projet = this.state.projets[index];
        projet.photo=formData
        console.log(projet)
    axios.post('http://localhost:4000/portfolio/add', formData)
    .then(res => {
      console.log("photo sauvée")
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  onChangeProjetTechno(e, index) {
    this.state.projets[index].techno= e.target.value;
    this.state.projets[index].modified = true;
    this.setState({projets:this.state.projets});
  }

  onChangeProjetLien(e, index) {
    this.state.projets[index].lienProjet= e.target.value;
    this.state.projets[index].modified = true;
    this.setState({projets:this.state.projets});
  }

  onChangeGitHubLien(e, index) {
    this.state.projets[index].lienGitHub= e.target.value;
    this.state.projets[index].modified = true;
    this.setState({projets:this.state.projets});
  }

  handleRemove(e, index) {
    axios.delete('http://localhost:4000/portfolio/delete', {data:{id:this.state.projets[index].id}})
    .then(
      this.state.projets.splice(index, 1)
    )
    .then(
      this.setState({ projets : this.state.projets})
    )
  }

  onSubmit(e, index) {
    e.preventDefault();

    let projet = this.state.projets[index];
    projet.photo=this.state.photo
    axios.post('http://localhost:4000/portfolio/add', projet)
    .then(res => {
      this.state.projets[index].modified = false;
      this.setState({projets: this.state.projets});
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    return (
      <section id='portfolio'>
        <div className="section-edit">
          <h2 className="section-edit-title"> PORTFOLIO </h2>
          {
            this.state.projets.map((projet, index)=> {
              return(
                <div key={index} className='mb-2 form-group row'>
                          <label htmlFor='projetTitle' className='col-form-label section-edit-label col-sm-2'>Titre</label>
                          <input  value={projet.title}
                                  id='projetTitle'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChangeProjetTitle(e, index)}}
                                  />
                          <label htmlFor='projetdesc' className='col-form-label section-edit-label col-sm-2'>Description</label>
                          <textarea value={projet.description}
                                    id='projetdesc'
                                    className='form-control col-sm-9 input'
                                    onChange={(e) => {this.onChangeProjetDescription(e, index)}}
                                    >
                          </textarea>
                          <label htmlFor='techno' className='col-form-label section-edit-label col-sm-2'>Technologies</label>
                          <input  value={projet.techno}
                                  id='techno'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChangeProjetTechno(e, index)}}
                                  />
                          <label htmlFor='lienProjet' className='col-form-label section-edit-label col-sm-2'>Lien vers projet</label>
                          <input  value={projet.lienProjet}
                                  id='lienProjet'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChangeProjetLien(e, index)}}
                                  />
                          <label htmlFor='lienGitHub' className='col-form-label section-edit-label col-sm-2'>Lien vers code</label>
                          <input  value={projet.lienGitHub}
                                  id='lienGitHub'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChangeGitHubLien(e, index)}}
                                  />
                          <label htmlFor='projetPhoto' className='col-form-label section-edit-label col-sm-2'>Photo</label>
                          <input  value={projet.photo}
                                  type='file'
                                  id='projetPhoto'
                                  className='col-sm-9'
                                  onChange={(e) => {this.onChangeProjetPhoto(e, index)}}
                                  />
                  <div className="contain-btn">
                    <SaveBtn modified={projet.modified} onSubmit={(e) => this.onSubmit(e, index)}/>
                    <SuppBtn handleRemove={(e) => this.handleRemove(e, index)} />
                  </div>
                </div>
              )
            })
          }
          <AddBtn addelement= {this.addProject} />
        </div>
      </section>
    )
  }
}
