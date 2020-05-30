import React from 'react';

// Bouton suppression de la partie administrateur
function SuppBtn(props){
  return (
    <button className='supp-btn'
            onClick= {props.handleRemove}
            > Supprimer
    </button>
  )
}

export default SuppBtn;
