import React from 'react';
import './style.scss';

function Alert({ type, onClose, message }) {
  if (type && onClose && message) {
    return (
      <div className={`alert alert-${type} alert-dismissible fade show row`} role="alert">
        <p className="col-10">{message}</p>
        <button type="button" onClick={onClose} className="btn-close col-2" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    )
  }


  return  <></>
}

export default Alert
