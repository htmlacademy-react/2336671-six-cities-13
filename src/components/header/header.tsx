import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthStatus } from '../../const';
import { AppRoute } from '../../const';
import { Fragment } from 'react';
import { logoutAction } from '../../store/api-actions';

function Header(): JSX.Element {

  const authStatus = useAppSelector((store) => store.authStatus);
  const userInfo = useAppSelector((store) => store.userInfo);
  const favorites = useAppSelector((store) => store.favorites);
  const dispatch = useAppDispatch();

  const handleLogout = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

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
                      <span className="header__user-name user__name">{userInfo?.email}</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to="/"
                      onClick={() => handleLogout}
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
