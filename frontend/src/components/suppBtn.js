import React from 'react';

function SuppBtn(props){
  return (
    <button className='supp-btn'
            onClick= {props.handleRemove}
            > Supprimer
    </button>
  )
}

export default SuppBtn;
