import {
  createSlice,
  createSelector,
  Action,
  PayloadAction
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

export const ADMIN_FEATURE_KEY = 'admin';

/*
 * Change this from `any` if there is a more specific error type.
 */
export type AdminError = any;

/*
 * Update these interfaces according to your requirements.
 */
export interface AdminEntity {
  id: number;
}

export interface AdminState {
  entities: AdminEntity[];
  loaded: boolean;
  error: AdminError;
}

export const initialAdminState: AdminState = {
  entities: [],
  loaded: false,
  error: null
};

export const adminSlice = createSlice({
  name: ADMIN_FEATURE_KEY,
  initialState: initialAdminState as AdminState,
  reducers: {
    getAdminStart: (state, action: PayloadAction<undefined>) => {
      state.loaded = false;
    },
    getAdminSuccess: (state, action: PayloadAction<AdminEntity[]>) => {
      state.loaded = true;
      state.entities = action.payload;
    },
    getAdminFailure: (state, action: PayloadAction<AdminError>) => {
      state.error = action.payload;
    }
  }
});

/*
 * Export reducer for store configuration.
 */
export const adminReducer = adminSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(getAdminSuccess([{ id: 1 }]));
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const {
  getAdminStart,
  getAdminSuccess,
  getAdminFailure
} = adminSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const entities = useSelector(selectAdminEntities);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const getAdminState = (rootState: any): AdminState =>
  rootState[ADMIN_FEATURE_KEY];

export const selectAdminEntities = createSelector(
  getAdminState,
  s => s.entities
);

export const selectAdminLoaded = createSelector(getAdminState, s => s.loaded);

export const selectAdminError = createSelector(getAdminState, s => s.error);

/*
 * Export default effect, handled by redux-thunk.
 * You can replace this with your own effects solution.
 */
export const fetchAdmin = (): ThunkAction<
  void,
  any,
  null,
  Action<string>
> => async dispatch => {
  try {
    dispatch(getAdminStart());
    // Replace this with your custom fetch call.
    // For example, `const data = await myApi.getAdmin`;
    // Right now we just load an empty array.
    const data = [];
    dispatch(getAdminSuccess(data));
  } catch (err) {
    dispatch(getAdminFailure(err));
  }
};
