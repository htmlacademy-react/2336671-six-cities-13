import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHostory } from '../../utils/mock-component';

describe('Component: footer', () => {
  it('Should render correct', () => {
    const footerTestId = 'footer-container';

    render(withHostory(<Footer/>));

    expect(screen.getByTestId(footerTestId)).toBeInTheDocument();
  });
});
