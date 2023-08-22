import { Link } from 'react-router-dom';
import { CitiesList } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCity } from '../../store/app-process/app-process.selectors';
import { changeCity } from '../../store/app-process/app-process.slice';
import { memo } from 'react';

function Cities(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCity);

  function handleCityClick(value: string) {
    dispatch(changeCity(value));
  }
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list" data-testid="cities-container">
          {CitiesList.map((value) => (
            <li
              className="locations__item"
              key={value} onClick={() => {
                handleCityClick(value);
              }}
              data-testid="city-value"
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

const CitiesMemo = memo(Cities);

export default CitiesMemo;
