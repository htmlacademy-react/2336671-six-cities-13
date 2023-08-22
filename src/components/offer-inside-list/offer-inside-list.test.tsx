import { render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import OfferInsideList from './offer-inside-list';

describe('Component: Offer inside list', () => {
  it('Should render correct', () => {
    const fakeGoods = [lorem.word(), lorem.word()];
    const insideListContainerTestId = 'inside-list-container';
    const insideListElementTestId = 'inside-list-element';

    render(<OfferInsideList goods={fakeGoods} />);

    expect(screen.getByTestId(insideListContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(insideListElementTestId).length).toBe(fakeGoods.length);
  });
});
