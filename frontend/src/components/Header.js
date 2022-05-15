import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoPath from './../images/header-logo.svg';

function Header({ loggedIn, userEmail, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header page__header">
      <img className="header__logo" src={logoPath} alt="Around the US app logo" />
      {!loggedIn &&
        (<nav>
          {location.pathname === '/sign-in' &&
            (
              <Link className="header__navlink" to="/sign-up">
                Sign up
              </Link>
            )
          }
          {location.pathname === '/sign-up' &&
            (
              <Link className="header__navlink" to="/sign-in">
                Sign in
              </Link>
            )
          }
        </nav>)
      }
      {loggedIn &&
        (<div className="header__user-info">
          <p className="header__email">{userEmail}</p>
          <button onClick={onSignOut} className="header__button" type="button">
            Sign out
          </button>
        </div>)
      }
    </header>
  )
}

export default Header;
