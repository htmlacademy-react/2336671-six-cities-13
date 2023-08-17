import { NameSpace, SortType } from '../../const';
import { getCity, getSortType } from './app-process.selectors';

describe ('App process selectors', () => {
  const state = {
    [NameSpace.App]: {
      city: 'Paris',
      sort: SortType.Popular,
    }
  };

  it ('Should return city from state', () => {
    const { city } = state[NameSpace.App];
    const result = getCity(state);
    expect(result).toBe(city);
  });

  it ('Should return sort from state', () => {
    const { sort } = state[NameSpace.App];
    const result = getSortType(state);
    expect(result).toBe(sort);
  });
});
