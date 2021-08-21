import React, { useContext } from 'react';
import Card from './Card';
import Loader from './Loader';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__section">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Логотип профиля" />
          <button className="profile__avatar-btn" aria-label="Обновить аватар"
          onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__bio">{currentUser.about}</p>
          <button className="profile__edit-btn" type="button" aria-label="Редактировать профиль"
          onClick={props.onEditProfile}
          ></button>
        </div>
        <button className="profile__add-btn" type="button" aria-label="Добавить фотографию"
        onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements content__section">
        {props.isLoading 
          ? <Loader />
          : <ul className="elements__list">
            {props.cards.map((card) => (
              <Card 
                key={card._id}
                card={card}
                onClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
              ))}          
            </ul>
        }
      </section>
    </main>
  )
}

export default Main;
