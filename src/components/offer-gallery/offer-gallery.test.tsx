import { render, screen } from '@testing-library/react';
import { image } from 'faker';
import OfferGallery from './offer-gallery';

describe('Component: Offer gallery', () => {
  it('Should render correct', () => {
    const fakeImages = [image.imageUrl(), image.imageUrl()];
    const galleryContainerTestId = 'gallery-container';
    const imageAltText = 'Photo studio';

    render(<OfferGallery images={fakeImages}/>);

    expect(screen.getByTestId(galleryContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(galleryContainerTestId).childElementCount).toBe(fakeImages.length);
    expect(screen.getAllByAltText(imageAltText).length).toBe(fakeImages.length);
  });
});
