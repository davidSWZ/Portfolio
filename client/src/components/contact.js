import React, {Component} from 'react';
import axios from 'axios';
import Flash from './flash';
import AnimateOnScroll from './animate-on-scroll';

export default class Contact extends Component {
  constructor(props) {
      super(props);

      this.onChange = this.onChange.bind(this);

      this.state={
        name:'',
        surname:'',
        mail:'',
        message:'',
        sent:'',
      }
  }

  componentDidMount() {
    this.setState({...this.state, sent:false})
  }

  onChange(e) {
    this.setState({...this.state, [e.target.name]: e.target.value, sent:''});
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({...this.state, sent:''})

    if (this.state.name !== '' && this.state.surname!== '' && this.state.mail!== '' && this.state.message!== '') {
      axios.post(process.env.REACT_APP_API_URL + 'mailer', this.state)
      .then(res => {
        this.setState({
          name:'',
          surname:'',
          mail:'',
          message:'',
          sent:'sent',
        })

      })
      .catch(function(err) {
        console.log(err);
      })
    } else {
      this.setState({...this.state, sent:'error'})
    }

  }

  render() {
    return (
      <footer id='contact' className='section text-center'>
        <h2 className="section-title"> Contactez moi </h2>

        <div className='container d-flex justify-content-center coordonée-container'>
          <div className='d-flex justify-content-center coordonné'>
            <p className="name-footer col"><i className="fas fa-phone"></i> <span className=" ml-2">06.77.09.93.06</span></p>
          </div>

          <div className='d-flex justify-content-center coordonné'>
            <p className="name-footer col"><i className="fas fa-envelope"></i> <span className=" ml-2">david.swiatkiewiez@gmail.com</span></p>
          </div>

          <div className='d-flex justify-content-center coordonné'>
            <p className="name-footer col"><i className="fas fa-home"></i> <span className=" ml-2">17 rue de l'église, 94300 Vincennes</span></p>
          </div>
        </div>

        <AnimateOnScroll>
          <form className='mt-2 container'>
          <div className='d-flex justify-content-center'>
            <input  type='text'
                    name='name'
                    className='form-control col-sm-9 input'
                    placeholder='Prénom'
                    value={this.state.name}
                    onChange={e => {this.onChange(e)}}
                    />
          </div>
          <div className='d-flex justify-content-center'>
            <input  type='text'
                    name='surname'
                    placeholder='Nom'
                    className='form-control col-sm-9 input mt-3'
                    value={this.state.surname}
                    onChange={e => {this.onChange(e)}}
                    />
          </div>
          <div className='d-flex justify-content-center'>
            <input  type='text'
                    name='mail'
                    placeholder='Adresse mail'
                    className='form-control col-sm-9 input mt-3'
                    value={this.state.mail}
                    onChange={e => {this.onChange(e)}}
                    />
          </div>
          <div className='d-flex justify-content-center'>
            <textarea type='text'
                      name='message'
                      placeholder='Expliquez moi votre projet'
                      className='form-control col-sm-9 input mt-3'
                      value={this.state.message}
                      onChange={e => {this.onChange(e)}}
                    >
            </textarea>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='enregistrer-btn pl-3 pr-3'
                    onClick= {e => {this.onSubmit(e)}}
                    ><i className="fas fa-paper-plane"></i> Envoyer
            </button>
          </div>
          <Flash
            text="Votre message a bien été envoyé."
            texterror="Veuillez remplir tous les champs"
            sent={this.state.sent}
          />
          </form>
        </AnimateOnScroll>
        <h1 className="name-footer">David<span className="coordonné">SWIATKIEWIEZ</span></h1>
      </footer>
    )
  }
}
