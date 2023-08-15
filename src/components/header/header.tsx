import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthStatus } from '../../const';
import { AppRoute } from '../../const';
import { Fragment } from 'react';
import { logoutAction } from '../../store/api-actions';
import { getAuthStatus, getUserInfo } from '../../store/user-process/user-process.selectors';
import { getFavorites } from '../../store/data-process/data-process.selectors';

function Header(): JSX.Element {

  const authStatus = useAppSelector(getAuthStatus);
  const userInfo = useAppSelector(getUserInfo);
  const favorites = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();

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
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }}
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
