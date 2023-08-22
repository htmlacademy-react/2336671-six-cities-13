import { render, screen } from '@testing-library/react';
import CitiesMemo from './cities';
import { CitiesList } from '../../const';

describe('Component: Cities', () => {
  it('Should render correct', () => {
    const citiesContainerTestId = 'cities-container';
    const citiValueTestId = 'city-value';

    render(<CitiesMemo />);

    const citiesContainer = screen.getByTestId(citiesContainerTestId);
    const cityValues = screen.getAllByTestId(citiValueTestId);

    expect(citiesContainer).toBeInTheDocument();
    expect(cityValues.length).toBe(CitiesList.length);
  });
});
