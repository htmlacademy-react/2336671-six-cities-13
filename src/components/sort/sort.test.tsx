import { render, screen } from '@testing-library/react';
import SortMemo from './sort';
import { withStore } from '../../utils/mock-component';

describe('Component: Sort', () => {
  it('Should render correct', () => {
    const sortContainerTestId = 'sort-container';
    const preparedComponent = withStore(<SortMemo />);

    render(preparedComponent.withStoreComponent);

    expect(screen.getByTestId(sortContainerTestId)).toBeInTheDocument();
  });
});
