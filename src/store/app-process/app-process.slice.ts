import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../const';
import { AppProcess } from '../../types/state';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortType.Popular;

const initialState: AppProcess = {
  city: DEFAULT_CITY,
  sort: DEFAULT_SORT,
  error: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    }
  },
});
