import { render, screen } from '@testing-library/react';
import { getFakeReview } from '../../utils/mocks';
import ReviewCommentMemo from './review';

describe('Componetn: Main Empty', () => {
  it('Should render correct', () => {
    const fakeReview = getFakeReview();
    const reviewElementTestId = 'review-element';

    render(<ReviewCommentMemo review={fakeReview}/>);

    expect(screen.getByTestId(reviewElementTestId)).toBeInTheDocument();
  });

  it('Should include "avatar", "name", "rating", "comment", "date"', () => {
    const fakeReview = getFakeReview();
    const avatarTestId = 'review-avatar';
    const userNameTestId = 'review-username';
    const ratingTestId = 'review-rating';
    const commentTestId = 'review-comment';
    const dateTestId = 'review-date';

    render(<ReviewCommentMemo review={fakeReview}/>);

    expect(screen.getByTestId(avatarTestId)).toBeInTheDocument();
    expect(screen.getByTestId(userNameTestId)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestId)).toBeInTheDocument();
    expect(screen.getByTestId(commentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(dateTestId)).toBeInTheDocument();
  });
});
