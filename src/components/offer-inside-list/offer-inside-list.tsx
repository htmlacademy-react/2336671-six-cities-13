type OfferInsideListProps = {
  goods: string[];
}

function OfferInsideList({goods}: OfferInsideListProps): JSX.Element {
  return (
    <ul className="offer__inside-list" data-testid="inside-list-container">
      {goods.map((value) => (
        <li className="offer__inside-item" key={value} data-testid="inside-list-element">
          {value}
        </li>
      ))}
    </ul>
  );
}

export default OfferInsideList;
