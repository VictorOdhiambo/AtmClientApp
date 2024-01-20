import React, { useContext } from 'react'
import AuthContext from '../context/ContextProvider';

function AlertBox({ show, message }) {
    const { closeAlertDialog } = useContext(AuthContext);
    return (
      <div
        className={
          show ? "alert-modal-container show" : "alert-modal-container"
        }
      >
        <div className="alert-modal">
          <div className="alert-modal-header">
            <h1>Alert Message</h1>
          </div>
          <div className="alert-modal-body">{message}</div>
          <hr />
          <div className="alert-modal-footer">
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => closeAlertDialog(e)}
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default AlertBox;