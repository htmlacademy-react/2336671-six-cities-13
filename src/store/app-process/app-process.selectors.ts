import { NameSpace, SortType } from '../../const';
import { State } from '../../types/state';

export const getCity = (state: Pick<State, NameSpace.App>): string => state[NameSpace.App].city;
export const getSortType = (state: Pick<State, NameSpace.App>): SortType => state[NameSpace.App].sort;
