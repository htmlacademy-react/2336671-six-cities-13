import { useState } from 'react';
import { SortType } from '../../const';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSortType } from '../../store/app-process/app-process.selectors';
import { changeSort } from '../../store/app-process/app-process.slice';

function Sort(): JSX.Element {

  const dispatch = useAppDispatch();
  const [isSortOpen, setSortOpen] = useState(false);
  const currentSortType = useAppSelector(getSortType);

  const sortClass = classNames({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': isSortOpen,
  });

  function handleSortClick() {
    setSortOpen((current) => !current);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortClick}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={sortClass}>
        {Object.values(SortType).map((value) => (
          <li
            key={value}
            className={`places__option ${currentSortType === value ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => {
              dispatch(changeSort(value));
              handleSortClick();
            }}
          >{value}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
