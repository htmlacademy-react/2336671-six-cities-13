import { render, screen } from '@testing-library/react';
import { withHostory } from '../../utils/mock-component';
import Logo from './logo';

describe('Component: logo', () => {
  it('Should render correct', () => {
    const logoTestId = 'logo-image';
    const preparedComponent = withHostory(<Logo/>);

    render(preparedComponent);

    expect(screen.getAllByTestId(logoTestId)).toBeTruthy();
  });
});
