import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Irina',
    about: 'offline',
    avatar: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [profileSubmitButtonText, setProfileSubmitButtonText] = useState('Сохранить');
  const [avatarSubmitButtonText, setAvatarSubmitButtonText] = useState('Сохранить');
  const [cardSubmitButtonText, setCardSubmitButtonText] = useState('Создать');
  
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    setIsLoading(true);
  
     Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Couldnt get data from the server. ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      }); 
  
   }, [])
  
  const tokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const token = localStorage.getItem('jwt');
      
      if (token) {
        auth.checkToken(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setUserEmail(res.data.email);
              history.push('/');
            }
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          })
      }
    }
  }
  
  const handleRegistration = (data) => {
    auth.register(data)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipPopupOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(`Unable to register. ${err}`);
      })
  }
  
  const handleLogin = (data) => {
    auth.authorize(data)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(data.email);
        localStorage.setItem('jwt', res.token);
        history.push('/');
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(`Unable to login. ${err}`);
      })
  }
  
  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push("/sign-in");
  }
  
  const handleUpdateUser = (data) => {
    setProfileSubmitButtonText('Сохранение...');
  
     api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Unable to update user info. ${err}`);
      })
      .finally(() => {
        setProfileSubmitButtonText('Сохранить');
      })
  }
  
  const handleAddPlace = (data) => {
    setCardSubmitButtonText('Сохранение...');
  
     api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        setAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Unable to publish a card. ${err}`);
      })
      .finally(() => {
        setCardSubmitButtonText('Создать');
      })
  }
  
  const handleUpdateAvatar = (data) => {
    setAvatarSubmitButtonText('Сохранение...');
  
     api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(`Unable to update user avatar. ${err}`);
      })
      .finally(() => {
        setAvatarSubmitButtonText('Сохранить');
      })
  }
  
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
  
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }
  
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }
  
  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(true);
  }
  
  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(true);
  }
  
  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(true);
  }
  
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header 
            loggedIn={loggedIn}
            userEmail={userEmail}
            onSignOut={handleSignOut}
          />
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfilePopupOpen}
              onAddPlace={handleAddPlacePopupOpen}
              onEditAvatar={handleEditAvatarPopupOpen}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isLoading={isLoading}
            />
            <Route path="/sign-up">
              <Register
                onRegistration={handleRegistration}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                 onLogin={handleLogin}
              />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          { loggedIn && <Footer /> }
          <EditProfilePopup 
            buttonText={profileSubmitButtonText}
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
          />
          <AddPlacePopup
            buttonText={cardSubmitButtonText}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlace}
            onClose={closeAllPopups}
          >
          </AddPlacePopup>
          <EditAvatarPopup 
            buttonText={avatarSubmitButtonText}
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
          /> 
          <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            buttonText="Да"
          />
          { selectedCard && 
          <ImagePopup 
            card={selectedCard} 
            onClose={closeAllPopups}
          />
          }
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
