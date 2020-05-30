import React, {Component} from 'react';
import axios from 'axios';
import SaveBtn from './saveBtn';
import SuppBtn from './suppBtn';
import AddBtn from './addBtn';

//Section d'édition pour le portfolio de la frontpage
export default class PortfolioEdit extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.addProject = this.addProject.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.state={
      projets:[]
    }
  }

  // Récupère les infos de projets depuis la BD
  componentDidMount() {
    let that = this;

    axios.get(process.env.REACT_APP_API_URL + 'portfolio')
      .then(res => {
        res.data.forEach(function(projet) {
          that.setState({projets: [...that.state.projets,
            { title:projet.title,
              description:projet.description,
              photo:projet.photo,
              techno:projet.techno,
              lienProjet:projet.lienProjet,
              lienGitHub:projet.lienGitHub,
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

  //Ajoute un projet au state
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

  // modifie le state en fonction de l'input
  onChange(e, index) {
    const eTargetName = e.target.name;
    const newProjetArray = this.state.projets.slice();
    newProjetArray[index][eTargetName] = e.target.value;
    newProjetArray[index].modified = true;
    this.setState({projets: newProjetArray});
  }

  // supprime un projet (BD et state)
  handleRemove(e, index) {
    const newProjetArray = this.state.projets.slice();
    axios.delete(process.env.REACT_APP_API_URL + 'portfolio/delete', {data:{id:this.state.projets[index].id}})
    .then(
      newProjetArray.splice(index, 1)
    )
    .then(
      this.setState({projets: newProjetArray})
    )
  }

  //Enrigistre un nouveau projet dans la BD
  onSubmit(e, index) {
    e.preventDefault();
    let projet = this.state.projets[index];
    const newProjetArray = this.state.projets.slice();
    axios.post(process.env.REACT_APP_API_URL + 'portfolio/add', projet)
    .then(res => {
      newProjetArray[index].modified = false;
      this.setState({projets: newProjetArray});
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
                                  name="title"
                                  id='projetTitle'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChange(e, index)}}
                                  />
                          <label htmlFor='projetdesc' className='col-form-label section-edit-label col-sm-2'>Description</label>
                          <textarea value={projet.description}
                                    name="description"
                                    id='projetdesc'
                                    className='form-control col-sm-9 input'
                                    onChange={(e) => {this.onChange(e, index)}}
                                    >
                          </textarea>
                          <label htmlFor='techno' className='col-form-label section-edit-label col-sm-2'>Technologies</label>
                          <input  value={projet.techno}
                                  name="techno"
                                  id='techno'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChange(e, index)}}
                                  />
                          <label htmlFor='lienProjet' className='col-form-label section-edit-label col-sm-2'>Lien vers projet</label>
                          <input  value={projet.lienProjet}
                                  name="lienProjet"
                                  id='lienProjet'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChange(e, index)}}
                                  />
                          <label htmlFor='lienGitHub' className='col-form-label section-edit-label col-sm-2'>Lien vers code</label>
                          <input  value={projet.lienGitHub}
                                  name="lienGitHub"
                                  id='lienGitHub'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChange(e, index)}}
                                  />
                          <label htmlFor='projetPhoto' className='col-form-label section-edit-label col-sm-2'>Photo</label>
                          <input  value={projet.photo}
                                  name="photo"
                                  id='projetPhoto'
                                  className='form-control col-sm-9 input'
                                  onChange={(e) => {this.onChange(e, index)}}
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
