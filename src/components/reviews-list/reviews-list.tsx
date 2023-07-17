import { Review } from '../../mocks/review';

function ReviewsList(): JSX.Element {
  return (
    <ul className="reviews__list">
      <Review />
    </ul>
  );
}

export default ReviewsList;
