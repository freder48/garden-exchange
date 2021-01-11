import './Modal.css';
import React from 'react';
import {Card, Button} from '@material-ui/core';

// const styles = {
//   modalMain: {
//     position:'fixed',
//     width: '60%',
//     top:'50%',
//     left: '50%',
//     height: '70vh',
//     justifyContent: 'center',
//     transform: 'translate(-50%,-50%)',
//     padding: '2em',
//     backgroundColor: '#7e9a9a',
//     border: '5px solid white'
//   }
// }


const Modal = ({ handleClose, show, children }) => {
  
  const showHideClassName = show ? "modal display-block" : "modal display-none";


  return (
    
    <div className={showHideClassName}>
      
      <Card className="modal-main">
        
        {children}
        
        <Button type="button" onClick={handleClose}>
          Close
        </Button>
      </Card>
     
    </div>
  );
};

export default Modal;