import ReviewComment from '../review/review';
import type { Review } from '../../types/review';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((value) => <ReviewComment key={value.id} review={value} />)}
    </ul>
  );
}

export default ReviewsList;
