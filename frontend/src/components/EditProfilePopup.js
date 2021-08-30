import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const hanldeDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Edit Profile"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    >
      <input 
        className="form__item form__item_el_name"
        id="profile-name" 
        type="text" 
        name="name" 
        placeholder="Name" 
        minLength="2" maxLength="40"
        value={name}
        onChange={handleNameChange}
        required 
      />
      <p className="form__error" id="profile-name-error"></p>
      <input 
        className="form__item form__item_el_bio"
        id="profile-bio" 
        type="text" 
        name="about" 
        placeholder="About" 
        minLength="2" maxLength="200" 
        value={description}
        onChange={hanldeDescriptionChange}
        required 
      />
      <p className="form__error" id="profile-bio-error"></p>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
