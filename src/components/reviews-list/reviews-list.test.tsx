import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { getFakeReview } from '../../utils/mocks';


describe('Componetn: Main Empty', () => {
  it('Should render correct', () => {
    const reviews = [getFakeReview()];
    const reviewListContainerTestId = 'review-list-container';

    render(<ReviewsList reviews={reviews} />);

    expect(screen.getByTestId(reviewListContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(reviewListContainerTestId).childElementCount).toBe(reviews.length);
  });
});
