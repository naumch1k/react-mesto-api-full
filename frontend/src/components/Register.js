import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegistration }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegistration({
      "password": password,
      "email": email,
    });
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return(
    <form onSubmit={handleSubmit} className="form form_theme_dark" name="signup-form">
      <h2 className="form__heading form__heading_theme_dark">Create an account</h2>
      <fieldset className="form__items form__items_theme_dark">
        <input 
          className="form__item form__item_theme_dark form__item_el_email"
          id="email" 
          type="email" 
          name="email" 
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required 
        />
        <p className="form__error" id="email-error"></p>
        <input 
          className="form__item form__item_theme_dark form__item_el_password"
          id="password" 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={password}
          onChange={handlePasswordChange}
          required 
        />
        <p className="form__error" id="password-error"></p>
      </fieldset>
      <button className="form__submit-btn form__submit-btn_theme_dark" type="submit">Sign up</button>
      <p className="form__text">
        Already have an account?
        <Link to="/sign-in" className="form__link"> Sign in</Link>
      </p>
    </form>
  );
}

export default Register;
