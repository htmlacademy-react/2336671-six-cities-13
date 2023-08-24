import { render, screen } from '@testing-library/react';
import SortMemo from './sort';
import { withStore } from '../../utils/mock-component';
import { SortType } from '../../const';

describe('Component: Sort', () => {
  it('Should render correct', () => {
    const sortContainerTestId = 'sort-container';
    const sortTitle = 'Sort by';
    const initialState = {
      APP: {
        city: 'Paris',
        sort: SortType.Popular,
      }
    };

    const { withStoreComponent } = withStore(<SortMemo />, initialState);

    render(withStoreComponent);

    expect(screen.getByTestId(sortContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(sortTitle)).toBeInTheDocument();
  });
});
