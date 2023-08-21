import { SortType } from '../../const';
import { appProcess, changeCity, changeSort } from './app-process.slice';

describe ('AppProcess slice test', () => {
  it('Should return state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {city: 'moscow', sort: SortType.HighToLow};
    const result = appProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {city: 'Paris', sort: SortType.Popular};
    const result = appProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should change city name', () => {
    const initialState = {city: 'Paris', sort: SortType.Popular};
    const expectedCity = 'Moscow';
    const result = appProcess.reducer(initialState, changeCity('Moscow'));
    expect(result.city).toEqual(expectedCity);
  });

  it ('Shoult change sort type', () => {
    const initialState = {city: 'Paris', sort: SortType.Popular};
    const expectedSort = SortType.HighToLow;
    const result = appProcess.reducer(initialState, changeSort(SortType.HighToLow));
    expect(result.sort).toEqual(expectedSort);
  });
});
