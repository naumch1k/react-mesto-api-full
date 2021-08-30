import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm
      name="avatar"
      title="Update Profile Picture"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    >
      <input 
        className="form__item"
        id="avatar-url"
        type="url"
        name="avatar"
        ref={avatarRef}
        placeholder="Link"
        required 
      />
      <p className="form__error" id="avatar-url-error"></p>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
