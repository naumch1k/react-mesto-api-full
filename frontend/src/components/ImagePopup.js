import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_image">
        <button onClick={props.onClose} className="popup__close-btn" type="button" aria-label="Закрыть окно"></button>
        <figure className="popup__figure">
          <img className="popup__image" src={`${props.card.link}`} alt={`Изображение ${props.card.name}`} />
          <figcaption className="popup__image-caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
