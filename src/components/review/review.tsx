import type { ReviewComment } from '../../types/review';
import { calcRating } from '../../utils/common';

type ReviewProps = {
  review: ReviewComment;
}

function Review({review}: ReviewProps): JSX.Element {
  const {comment, date, rating, user} = review;
  const commentDate = new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${calcRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date.split('T')[0]}>{commentDate}</time>
      </div>
    </li>
  );
}

export default Review;
