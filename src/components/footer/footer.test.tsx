import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../utils/mock-component';

describe('Component: footer', () => {
  it('Should render correct', () => {
    const footerTestId = 'footer-container';

    render(withHistory(<Footer/>));

    expect(screen.getByTestId(footerTestId)).toBeInTheDocument();
  });
});
