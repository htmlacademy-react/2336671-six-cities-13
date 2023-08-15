import Header from '../../components/header/header';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { AppRoute, AuthStatus, MapType, OfferType } from '../../const';
import { calcRating } from '../../utils/common';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import PageNotFoundScreen from '../page-not-found-screen/page-not-found-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { addToFavoriteAction, fetchNearbyPlacesAction, fetchOfferDetailsAction, fetchReviewsAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect } from 'react';
import PlacesList from '../../components/places-list/places-list';
import ScrollToTop from '../../utils/scroll';
import { getIsNearbyPlacesLoading, getIsOfferDetailsLoading, getIsReviewsLoading, getNearbyPlaces, getOfferDetails, getReviews } from '../../store/data-process/data-process.selectors';
import { getAuthStatus } from '../../store/user-process/user-process.selectors';

function OfferScreen(): JSX.Element {

  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const offerDetails = useAppSelector(getOfferDetails);
  const reviews = useAppSelector(getReviews);
  const lastReviwes = reviews.slice(-10);
  const nearbyPlaces = useAppSelector(getNearbyPlaces);
  const authStatus = useAppSelector(getAuthStatus);
  const isOfferDetailsLoading = useAppSelector(getIsOfferDetailsLoading);
  const isReviewsLoading = useAppSelector(getIsReviewsLoading);
  const isNearbyPlacesLoading = useAppSelector(getIsNearbyPlacesLoading);

  const tempPlaces = nearbyPlaces?.slice(0, 3);

  ScrollToTop();

  useEffect(() => {
    dispatch(fetchOfferDetailsAction(params.ids as string));
    dispatch(fetchReviewsAction(params.ids as string));
    dispatch(fetchNearbyPlacesAction(params.ids as string));
  }, [dispatch, params.ids]);

  if(isOfferDetailsLoading || isReviewsLoading || isNearbyPlacesLoading) {
    return <LoadingScreen />;
  }

  if (!offerDetails) {
    return <PageNotFoundScreen />;
  }

  const {title, description, type, price, bedrooms, maxAdults, rating, isPremium, isFavorite, goods, host, images, city} = offerDetails;

  const handleOnFavoriteClick = () => {
    if (authStatus === AuthStatus.Auth) {
      dispatch(addToFavoriteAction({status: (!isFavorite ? 1 : 0), id: params.ids as string}));
      return;
    }
    navigate(AppRoute.Login);
  };

  const favClass = classNames(
    'offer__bookmark-button', 'button',
    {'offer__bookmark-button--active': isFavorite},
  );

  function OfferGallery(): JSX.Element {
    return (
      <div className="offer__gallery">
        {images.map((value) => (
          <div className="offer__image-wrapper" key={value}>
            <img className="offer__image" src={value} alt="Photo studio"/>
          </div>
        ))}
      </div>
    );
  }

  function OfferMark(): JSX.Element {
    return (
      <div className="offer__mark">
        <span>Premium</span>
      </div>
    );
  }

  function OfferInsideList(): JSX.Element {
    return (
      <ul className="offer__inside-list">
        {goods.map((value) => (
          <li className="offer__inside-item" key={value}>
            {value}
          </li>
        ))}
      </ul>
    );
  }

  function ProHost(): JSX.Element {
    return (
      <span className="offer__user-status">
        Pro
      </span>
    );
  }

  function HostUser(): JSX.Element {

    let hostUserClass = classNames('offer__avatar-wrapper', 'user__avatar-wrapper');

    if (host.isPro) {
      hostUserClass += ' offer__avatar-wrapper--pro';
    }

    return (
      <div className="offer__host-user user">
        <div className={hostUserClass}>
          <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="offer__user-name">
          {host.name}
        </span>
        {host.isPro && <ProHost />}
      </div>
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: {title}</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <OfferMark />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className={favClass} type="button" onClick={handleOnFavoriteClick}>
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${calcRating(rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {OfferType[type as keyof typeof OfferType]}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <OfferInsideList />
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <HostUser />
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={lastReviwes} />
                {authStatus === AuthStatus.Auth && <ReviewForm />}
              </section>
            </div>
          </div>
          <Map city={city} offers={tempPlaces} currentPlace={offerDetails} mapType={MapType.Offer}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList shortOffers={tempPlaces} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
