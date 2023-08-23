import { render, screen } from '@testing-library/react';
import ReviewForm from './review-form';
import { withStore } from '../../utils/mock-component';
import { StarsRating } from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: Login Screen', () => {

  it('Should render correct', () => {
    const reviewContainerTestId = 'review-container';
    const ratingContainerTestId = 'rating-container';
    const ratingElementTestId = 'rating-element';
    const reviewTestId = 'review-element';

    const { withStoreComponent } = withStore(<ReviewForm /> , {});

    render(withStoreComponent);

    expect(screen.getByTestId(reviewContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(ratingContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(ratingElementTestId).length).toBe(StarsRating.length);
    expect(screen.getByTestId(reviewTestId)).toBeInTheDocument();
  });

  it('Should render correctly when user enter review', async () => {
    const textAreaTestId = 'review-element';
    const expectedReviewValue = 'Lorem ipsum';
    const { withStoreComponent } = withStore(<ReviewForm /> , {});

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(textAreaTestId),
      expectedReviewValue,
    );

    expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
  });

});
