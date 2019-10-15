import React, {Component} from 'react';
import axios from 'axios';

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

  addProject() {
    this.setState({projets:[...this.state.projets, {title:'', description:'', photo:'', techno:[], lienProjet:'', lienGitHub:''}]})
  }

  onChangeProjetTitle(e, index) {
    this.state.projets[index].title= e.target.value;

    this.setState({projets:this.state.projets});
  }

  onChangeProjetDescription(e, index) {
    this.state.projets[index].description= e.target.value;

    this.setState({projets:this.state.projets});
  }

  onChangeProjetPhoto(e, index) {
    this.state.projets[index].photo= e.target.value;

    this.setState({projets:this.state.projets});
  }

  onChangeProjetTechno(e, index) {
    this.state.projets[index].techno= e.target.value;

    this.setState({projets:this.state.projets});
  }

  onChangeProjetLien(e, index) {
    this.state.projets[index].lienProjet= e.target.value;

    this.setState({projets:this.state.projets});
  }

  onChangeGitHubLien(e, index) {
    this.state.projets[index].lienGitHub= e.target.value;

    this.setState({projets:this.state.projets});
  }

  handleRemove(index) {
    this.state.projets.splice(index, 1);

    this.setState({projets:this.state.projets})
  }

  onSubmit(e) {
    e.preventDefault();

    let projets = this.state.projets;

    axios.delete('http://localhost:4000/portfolio/delete', {data:{}})
      .then(
        projets.forEach(function(projet) {

          axios.post('http://localhost:4000/portfolio/add', projet)
          .then(res => {console.log(projet)})
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
                                  id='lienProjet'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChangeGitHubLien(e, index)}}
                                  />
                          <label htmlFor='projetPhoto' className='col-form-label section-edit-label col-sm-2'>Photo</label>
                          <input  value={projet.photo}
                                  id='projetPhoto'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChangeProjetPhoto(e, index)}}
                                  />
                  <button className='supp-btn'
                          onClick={() => {this.handleRemove(index)}}>
                    Supprimer
                  </button>
                </div>
              )
            })
          }
          <div>
            <button   className='add-btn'
                      onClick={this.addProject}
                      >+
            </button>
          </div>
          <div>
            <button   className='enregistrer-btn'
                      onClick={this.onSubmit}
                      >
            Enregistrer
            </button>
          </div>
        </div>
      </section>
    )
  }
}
