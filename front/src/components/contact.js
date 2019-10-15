import React, {Component} from 'react';

export default class Contact extends Component {
  render() {
    return (
      <footer id='contact' className='section text-center'>
        <h2 className="section-title"> Contactez moi </h2>
        <form >
          <input  type='text'
                  placeholder='Entrer votre prénom'
                  />
          <input  type='text'
                  placeholder='Entrer votre nom'
                  />
        </form>
      </footer>
    )
  }
}
