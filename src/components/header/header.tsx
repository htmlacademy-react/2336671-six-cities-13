import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { useAppSelector } from '../../hooks';
import { AuthStatus } from '../../const';
import { AppRoute } from '../../const';
import { Fragment } from 'react';

function Header(): JSX.Element {

  const authStatus = useAppSelector((store) => store.authStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              { authStatus === AuthStatus.Auth ?
                <Fragment>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to="/"
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </Fragment> :
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">Sign in</span>
                </Link> }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
