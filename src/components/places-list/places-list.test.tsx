import { render, screen } from '@testing-library/react';
import { getFakeShortOffer } from '../../utils/mocks';
import PlacesList from './places-list';

describe('Component: pplacec-list', () => {
  it('Should render correct', () => {
    const placeListContainer = 'places-list-container';
    const fakePlacesList = [getFakeShortOffer(), getFakeShortOffer()];

    render(<PlacesList shortOffers={fakePlacesList} />);
    const placesContainer = screen.getByTestId(placeListContainer);

    expect(placesContainer).toBeInTheDocument();
    //expect(placesContainer.childElementCount).toBe(fakePlacesList.length);
  });
});
