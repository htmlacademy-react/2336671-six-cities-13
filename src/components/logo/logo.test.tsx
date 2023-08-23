import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Logo from './logo';

describe('Component: logo', () => {
  it('Should render correct', () => {
    const logoTestId = 'logo-image';
    const preparedComponent = withHistory(<Logo/>);

    render(preparedComponent);

    expect(screen.getAllByTestId(logoTestId)).toBeTruthy();
  });
});
