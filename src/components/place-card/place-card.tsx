import { Link } from 'react-router-dom';
import { OfferType } from '../../const';
import type { ShortOffer } from '../../types/offer';
import { calcRating } from '../../utils/common';
import classNames from 'classnames';

type PlaceCardProps = {
  shortOffer: ShortOffer;
  setCityId?: React.Dispatch<React.SetStateAction<string>>;
}

function PlaceCard({shortOffer, setCityId}: PlaceCardProps): JSX.Element {
  const {id, title, type, price, previewImage, isFavorite, isPremium, rating} = shortOffer;

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

  const PlaceCardMark = (): JSX.Element => (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );

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
    >
      {isPremium && <PlaceCardMark />}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link
          to={`/offers/${id}`}
        >
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title}/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={favClass} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calcRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`/offers/${id}`}
          >{title}
          </Link>
        </h2>
        <p className="place-card__type">{OfferType[type as keyof typeof OfferType]}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
