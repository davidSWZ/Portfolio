import React from 'react';

// Composant pour afficher un message flash
function Flash(props){
  const sent = props.sent;
  if (sent === 'sent') {
    return(
      <div>
        {props.text}
        </div>
    )
  }
  if (sent === 'error') {
    return(
      <div>
        {props.texterror}
      </div>
    )
  }
  else {
    return null;
  }
}

export default Flash;
