import React, {Component} from 'react';
import axios from 'axios';

export default class HomeEdit extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state={
      home_title:'',
      home_description:''
    }
  }

  componentDidMount(){
    axios.get(process.env.REACT_APP_API_URL + 'home')
      .then(res => {
        this.setState({
          home_title: res.data[0].home_title,
          home_description:res.data[0].home_description
        })
      })
      .catch(function(err) {
        console.log(err);
      })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();

    console.log('home_title: ' + this.state.home_title);
    console.log('home_description: ' + this.state.home_description);

    const homeUpdate = {
      home_title : this.state.home_title,
      home_description : this.state.home_description
    }

    axios.post(process.env.REACT_APP_API_URL + 'home/update/5d59b6da50789503228686b6', homeUpdate)
      .then(res => console.log("Home updated"))
      .catch(function(err) {
        console.log(err);
      })
  }

  render() {
    return (
      <section className=' mt-5 '>
        <div className="section-edit section-edit-home">
          <h2 className="section-edit-title">HOME</h2>
          <form onSubmit={this.onSubmit} >

            <div className='form-group row'>
              <label htmlFor='input-title' className='col-form-label section-edit-label col-sm-2'> Titre du site </label>
              <div className='col-sm-9 '>
                <input  type='text'
                        id='input-title'
                        className='form-control input'
                        name='home_title'
                        value={this.state.home_title}
                        onChange={this.onChange}
                        />
              </div>
            </div>

            <div className='form-group row'>
              <label htmlFor='input-description' className='col-form-label section-edit-label col-sm-2'>Sous-titre </label>
              <div className='col-sm-9'>
                <textarea   id='input-description'
                            className='form-control input'
                            name='home_description'
                            value={this.state.home_description}
                            onChange={this.onChange}
                            >
                </textarea>
              </div>
            </div>

            <div className='form-group d-flex justify-content-end'>
            <input  className='enregistrer-btn'
                    value='Enregistrer'
                    type='submit'
                    />
            </div>
          </form>
        </div>
      </section>
    )
  }
}
