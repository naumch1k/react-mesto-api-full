import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwned = card.owner === currentUser._id;
  const isLiked = card.likes.some(item => item === currentUser._id);

  const cardDeleteButtonClassName = (
    `element__delete-btn ${isOwned ? '' : 'element__delete-btn_hidden'}`
  );

  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked && 'element__like-btn_active'}`
  ); 

  const handleClick = () => {
    onClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return(
    <li className="element">
      <img onClick={handleClick} className="element__image" src={card.link} alt={`${card.name}`} />
      <div className="element__desc">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-container">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Like photo"></button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button" aria-label="Delete photo"></button>
    </li>
  );

}

export default Card; 