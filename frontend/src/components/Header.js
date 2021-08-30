import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoPath from './../images/header-logo.svg';

function Header({ loggedIn, userEmail, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header page__header">
      <img className="header__logo" src={logoPath} alt="Логотип сервиса Mesto Russia" />
      {!loggedIn &&
        (<nav>
          {location.pathname === '/sign-in' &&
            (
              <Link className="header__navlink" to="/sign-up">
                Регистрация
              </Link>
            )
          }
          {location.pathname === '/sign-up' &&
            (
              <Link className="header__navlink" to="/sign-in">
                Войти
              </Link>
            )
          }
        </nav>)
      }
      {loggedIn &&
        (<div className="header__user-info">
          <p className="header__email">{userEmail}</p>
          <button onClick={onSignOut} className="header__button" type="button">
            Выйти
          </button>
        </div>)
      }
    </header>
  )
}

export default Header;
