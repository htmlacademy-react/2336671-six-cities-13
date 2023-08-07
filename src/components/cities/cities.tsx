import { Link } from 'react-router-dom';
import { CitiesList } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/actions';

function Cities(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector((store) => store.city);

  function handleCityClick(value: string) {
    dispatch(changeCity(value));
  }
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CitiesList.map((value) => (
            <li className="locations__item" key={value} onClick={() => {
              handleCityClick(value);
            }}
            >
              <Link className={`locations__item-link tabs__item ${city === value ? 'tabs__item--active' : ''}`} to="/">
                <span>{value}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Cities;
