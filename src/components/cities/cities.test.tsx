import { render, screen } from '@testing-library/react';
import CitiesMemo from './cities';
import { CitiesList } from '../../const';
import { withStore } from '../../utils/mock-component';

describe('Component: Cities', () => {
  it('Should render correct', () => {
    const citiesContainerTestId = 'cities-container';
    const citiValueTestId = 'city-value';

    render(withStore(<CitiesMemo />).withStoreComponent);

    const citiesContainer = screen.getByTestId(citiesContainerTestId);
    const cityValues = screen.getAllByTestId(citiValueTestId);

    expect(citiesContainer).toBeInTheDocument();
    expect(cityValues.length).toBe(CitiesList.length);
  });
});
