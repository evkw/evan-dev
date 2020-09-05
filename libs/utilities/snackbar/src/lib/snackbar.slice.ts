import {
  createSlice,
  createSelector,
  Action,
  PayloadAction,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk';

export const SNACKBAR_FEATURE_KEY = 'snackbar';

/*
 * Change this from `any` if there is a more specific error type.
 */
export type SnackbarError = any;

/*
 * Update these interfaces according to your requirements.
 */
export interface SnackbarEntity {
  id: number;
}

export interface SnackbarState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isOpen: boolean;
}

export const initialSnackbarState: SnackbarState = {
  message: null,
  type: null,
  isOpen: false
};

export const snackbarSlice = createSlice({
  name: SNACKBAR_FEATURE_KEY,
  initialState: initialSnackbarState as SnackbarState,
  reducers: {
    success: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.type = 'success';
      state.isOpen = true;
    },
    error: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.type = 'error';
      state.isOpen = true;
    },
    info: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.type = 'info';
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    }
  }
});

/*
 * Export reducer for store configuration.
 */
export const snackbarReducer = snackbarSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(getSnackbarSuccess([{ id: 1 }]));
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const {
  success,
  error,
  close, 
  info
} = snackbarSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const entities = useSelector(selectSnackbarEntities);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const getSnackbarState = (rootState: any): SnackbarState =>
  rootState[SNACKBAR_FEATURE_KEY];

export const selectSnackbarState = createSelector(getSnackbarState, s => s);