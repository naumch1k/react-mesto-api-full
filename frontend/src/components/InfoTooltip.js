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
          alt={props.isSuccess ? 'Иконка успешной регистрации' : 'Иконка ошибки регистрации'}
        />
        <p className="popup__message">
          {props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
        <button onClick={props.onClose} className="popup__close-btn" type="button" aria-label="Закрыть окно"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;