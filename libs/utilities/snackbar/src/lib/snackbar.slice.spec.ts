import {
  snackbarReducer,
  getSnackbarStart,
  getSnackbarFailure,
  getSnackbarSuccess
} from './snackbar.slice';

describe('snackbar reducer', () => {
  it('should handle initial state', () => {
    expect(snackbarReducer(undefined, { type: '' })).toMatchObject({
      entities: []
    });
  });

  it('should handle get snackbar actions', () => {
    let state = snackbarReducer(undefined, getSnackbarStart());

    expect(state).toEqual({
      loaded: false,
      error: null,
      entities: []
    });

    state = snackbarReducer(state, getSnackbarSuccess([{ id: 1 }]));

    expect(state).toEqual({
      loaded: true,
      error: null,
      entities: [{ id: 1 }]
    });

    state = snackbarReducer(state, getSnackbarFailure('Uh oh'));

    expect(state).toEqual({
      loaded: true,
      error: 'Uh oh',
      entities: [{ id: 1 }]
    });
  });
});
