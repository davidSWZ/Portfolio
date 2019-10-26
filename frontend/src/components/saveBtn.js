import React, {Component} from 'react';

function SaveBtn(props){
  const modified = props.modified;
  if (modified) {
    return (
      <button className='enregistrer-btn'
              onClick= {props.onSubmit}
              >Enregistrer
      </button>
    )
  }else {
    return null;
  }
}

export default SaveBtn;
