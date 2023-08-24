import { memo } from 'react';
import type { Review } from '../../types/review';
import { calculateRating } from '../../utils/common';

type ReviewProps = {
  review: Review;
}

function ReviewComment({review}: ReviewProps): JSX.Element {
  const {comment, date, rating, user} = review;
  const commentDate = new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return (
    <li className="reviews__item" data-testid="review-element">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" data-testid="review-avatar"/>
        </div>
        <span className="reviews__user-name" data-testid="review-username">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars" data-testid="review-rating">
            <span style={{width: `${calculateRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text" data-testid="review-comment">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date.split('T')[0]} data-testid="review-date">{commentDate}</time>
      </div>
    </li>
  );
}

const ReviewCommentMemo = memo(ReviewComment);

export default ReviewCommentMemo;
