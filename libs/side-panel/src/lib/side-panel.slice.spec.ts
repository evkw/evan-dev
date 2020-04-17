import {
  sidePanelReducer,
  getSidePanelStart,
  getSidePanelFailure,
  getSidePanelSuccess
} from './side-panel.slice';

describe('sidePanel reducer', () => {
  it('should handle initial state', () => {
    expect(sidePanelReducer(undefined, { type: '' })).toMatchObject({
      entities: []
    });
  });

  it('should handle get sidePanel actions', () => {
    let state = sidePanelReducer(undefined, getSidePanelStart());

    expect(state).toEqual({
      loaded: false,
      error: null,
      entities: []
    });

    state = sidePanelReducer(state, getSidePanelSuccess([{ id: 1 }]));

    expect(state).toEqual({
      loaded: true,
      error: null,
      entities: [{ id: 1 }]
    });

    state = sidePanelReducer(state, getSidePanelFailure('Uh oh'));

    expect(state).toEqual({
      loaded: true,
      error: 'Uh oh',
      entities: [{ id: 1 }]
    });
  });
});
