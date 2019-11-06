import React from 'react';

function AddBtn(props){
  return (
    <button className='add-btn'
            onClick={props.addelement}
            >+
    </button>
  )
}

export default AddBtn;
