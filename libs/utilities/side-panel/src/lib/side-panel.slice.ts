import {
  createSlice,
  createSelector,
  Action,
  PayloadAction
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

export const SIDE_PANEL_FEATURE_KEY = 'sidePanel';

export interface SidePanelState {
  component;
}

export const initialSidePanelState: SidePanelState = {
  component: null
};

export const sidePanelSlice = createSlice({
  name: SIDE_PANEL_FEATURE_KEY,
  initialState: initialSidePanelState as SidePanelState,
  reducers: {
    openSidePanel: (state, action: PayloadAction<any>) => {
      state.component = action.payload;
    },
    closeSidePanel: (state) => {
      state.component = null;
    }
  }
});

export const sidePanelReducer = sidePanelSlice.reducer;

export const {
 openSidePanel,
 closeSidePanel
} = sidePanelSlice.actions;

export const getSidePanelState = (rootState: any): SidePanelState =>
  rootState[SIDE_PANEL_FEATURE_KEY];

export const selectSidePanelComponent = createSelector(
  getSidePanelState,
  s => s.component
);
