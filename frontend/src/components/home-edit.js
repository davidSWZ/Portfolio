import React, {Component} from 'react';
import axios from 'axios';

export default class HomeEdit extends Component {

  constructor(props) {
    super(props);

    this.onChangeHomeTitle = this.onChangeHomeTitle.bind(this);
    this.onChangeHomeDescription = this.onChangeHomeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state={
      home_title:'',
      home_description:''
    }
  }

  componentDidMount(){
    axios.get('http://localhost:4000/home')
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

  onChangeHomeTitle(e) {
    this.setState({
      home_title: e.target.value
    })
  }

  onChangeHomeDescription(e) {
    this.setState({
      home_description: e.target.value
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

    axios.post('http://localhost:4000/home/update/5d59b6da50789503228686b6', homeUpdate)
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
                        placeholder=''
                        value={this.state.home_title}
                        onChange={this.onChangeHomeTitle}
                        />
              </div>
            </div>

            <div className='form-group row'>
              <label htmlFor='input-description' className='col-form-label section-edit-label col-sm-2'>Sous-titre </label>
              <div className='col-sm-9'>
                <textarea   id='input-description'
                            className='form-control input'
                            placeholder=''
                            value={this.state.home_description}
                            onChange={this.onChangeHomeDescription}
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
