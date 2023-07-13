import Header from '../../components/header/header';

import '../page-not-found-screen/page-not-found-screen.css';

function PageNotFoundScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <Header />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Page Not Found</h1>
            <div className="notfound__status-wrapper">
              <b className="notfound__status">404 &mdash; Page Not Found</b>
              <p className="notfound__status-description">How did you get here?</p>
              <p className="notfound__status-description">This page does not exist!</p>
              <form className="notfound__form form" action="/">
                <button className="notfound__submit form__submit button" type="submit">Go Home</button>
              </form>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default PageNotFoundScreen;
