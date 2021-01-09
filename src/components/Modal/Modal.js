import './Modal.css';
import React from 'react';
import {Card} from '@material-ui/core';


const Modal = ({ handleClose, show, children }) => {
  
  const showHideClassName = show ? "modal display-block" : "modal display-none";


  return (
    <div className={showHideClassName}>
      
      <Card className="modal-main">
        
        {children}
        
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </Card>
     
    </div>
  );
};

export default Modal;