import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus, OfferType } from '../../const';
import type { ShortOffer } from '../../types/offer';
import { calculateRating } from '../../utils/common';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addToFavoriteAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/user-process/user-process.selectors';
import { memo } from 'react';

type PlaceCardProps = {
  shortOffer: ShortOffer;
  setCityId?: (id: string) => void;
}

function PlaceCard({shortOffer, setCityId}: PlaceCardProps): JSX.Element {
  const {id, title, type, price, previewImage, isFavorite, isPremium, rating} = shortOffer;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStatus = useAppSelector(getAuthStatus);

  const handleMouseEnter = (cityId: string) => {
    if (setCityId) {
      setCityId(cityId);
    }
  };
  const handleMouseLeave = () => {
    if (setCityId) {
      setCityId('');
    }
  };

  const handleFavoriteClick = () => {
    if (authStatus === AuthStatus.Auth) {
      dispatch(addToFavoriteAction({status: (!isFavorite ? 1 : 0), id: id}));
      return;
    }
    navigate(AppRoute.Login);
  };

  const favClass = classNames(
    'place-card__bookmark-button',
    {'place-card__bookmark-button--active': isFavorite},
    'button'
  );

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={handleMouseLeave}
      data-testid='place-card-container'
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`} >
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title}/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={favClass} type="button" onClick={handleFavoriteClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculateRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{OfferType[type as keyof typeof OfferType]}</p>
      </div>
    </article>
  );
}

const PlaceCardMemo = memo(PlaceCard);

export default PlaceCardMemo;
