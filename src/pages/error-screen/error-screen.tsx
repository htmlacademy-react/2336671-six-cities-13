
import { Link } from 'react-router-dom';

import styles from './error-screen.module.css';
import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import HeaderMemo from '../../components/header/header';

function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="page page--favorites-empty">
      <HeaderMemo />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Offers Not Found</h1>
            <div className={styles['notfound__status-wrapper']}>
              <b className={styles['notfound__status']}>Offers not found</b>

              <button className="form__submit button" onClick={() => {
                dispatch(fetchOffersAction());
              }}
              >Try again
              </button>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default ErrorScreen;
