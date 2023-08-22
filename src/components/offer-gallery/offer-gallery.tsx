type OfferGalleryProps = {
  images: string[];
}

function OfferGallery({images}: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery" data-testid="gallery-container">
      {images.map((value) => (
        <div className="offer__image-wrapper" key={value}>
          <img className="offer__image" src={value} alt="Photo studio"/>
        </div>
      ))}
    </div>
  );
}

export default OfferGallery;
