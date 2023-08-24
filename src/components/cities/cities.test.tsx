import { render, screen } from '@testing-library/react';
import CitiesMemo from './cities';
import { CITIES_LIST, SortType } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: Cities', () => {
  it('Should render correct', () => {
    const citiesContainerTestId = 'cities-container';
    const citiValueTestId = 'city-value';
    const initialState = {
      APP: {
        city: 'Paris',
        sort: SortType.Popular,
      }
    };

    const { withStoreComponent } = withStore(<CitiesMemo />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const citiesContainer = screen.getByTestId(citiesContainerTestId);
    const cityValues = screen.getAllByTestId(citiValueTestId);

    expect(citiesContainer).toBeInTheDocument();
    expect(cityValues.length).toBe(CITIES_LIST.length);
  });
});
