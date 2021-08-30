import React from 'react';

import successIcon from '../images/success-icon.svg'
import failIcon from '../images/fail-icon.svg'

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_message">
        <img
          className="popup__icon"
          src={props.isSuccess ? successIcon : failIcon}
          alt={props.isSuccess ? 'Success icon' : 'Error icon'}
        />
        <p className="popup__message">
          {props.isSuccess ? 'Your account has been created successfully!' : 'Sorry, something went wrong. Please try again.'}
        </p>
        <button onClick={props.onClose} className="popup__close-btn" type="button" aria-label="Close popup"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;