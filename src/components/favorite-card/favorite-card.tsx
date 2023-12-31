import { Link } from 'react-router-dom';
import { OfferType } from '../../const';
import { useAppDispatch } from '../../hooks';
import { addToFavoriteAction } from '../../store/api-actions';
import { Favorite } from '../../types/favorite';
import { calculateRating } from '../../utils/common';

type FavoriteCardProps = {
  offer: Favorite;
}

function FavoriteCard ({offer}: FavoriteCardProps): JSX.Element {

  const {previewImage, price, title, type, isPremium, rating, isFavorite, id} = offer;

  const dispatch = useAppDispatch();

  const handleFavoriteClick = () => {
    dispatch(addToFavoriteAction({status: (!isFavorite ? 1 : 0), id: id}));
  };

  const PlaceCardMark = (): JSX.Element => (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );

  return(
    <article className="favorites__card place-card" data-testid="favorites-card">
      {isPremium && <PlaceCardMark />}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculateRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{OfferType[type as keyof typeof OfferType]}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
