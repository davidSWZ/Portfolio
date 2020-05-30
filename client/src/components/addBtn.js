import React from 'react';

//Bouton ajout pour l'espace administrateur
function AddBtn(props){
  return (
    <button className='add-btn'
            onClick={props.addelement}
            >+
    </button>
  )
}

export default AddBtn;
