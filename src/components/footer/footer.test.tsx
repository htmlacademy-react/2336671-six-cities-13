import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Component: footer', () => {
  it('Should render correct', () => {
    const footerTestId = 'footer-container';

    render(<Footer />);
    screen.debug();

    expect(screen.getByTestId(footerTestId)).toBeInTheDocument();
  });
});
