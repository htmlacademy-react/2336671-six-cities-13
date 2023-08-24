import type { Review } from '../../types/review';
import ReviewCommentMemo from '../review/review';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list" data-testid="review-list-container">
      {reviews.map((value) => <ReviewCommentMemo key={value.id} review={value}/>)}
    </ul>
  );
}

export default ReviewsList;
