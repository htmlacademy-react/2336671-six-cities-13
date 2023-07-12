import Header from '../../components/header/header';

function PageNotFoundScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <Header />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Page Not Found</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">404 &mdash; Page Not Found</b>
              <p className="favorites__status-description">How did you get here?</p>
              <p className="favorites__status-description">This page does not exist!</p>
              <form className="login__form form" action="#">
                <button className="login__submit form__submit button" type="submit">Go Home</button>
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
