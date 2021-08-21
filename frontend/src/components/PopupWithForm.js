import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name}  ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_form">
        <button onClick={props.onClose} className="popup__close-btn" type="button" aria-label="Закрыть окно"></button>
        <form onSubmit={props.onSubmit} className="form" name={`${props.name}-form`}>
        <h2 className="form__heading">{props.title}</h2>
          <fieldset className="form__items">
            {props.children}
          </fieldset>
          <button className="form__submit-btn" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
