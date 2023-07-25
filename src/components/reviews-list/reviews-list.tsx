import Review from '../review/review';
import type { ReviewComment } from '../../types/review';

type ReviewsListProps = {
  reviews: ReviewComment[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((value) => <Review key={value.id} review={value} />)}
    </ul>
  );
}

export default ReviewsList;
