import {
  firebaseAuthReducer,
  getFirebaseAuthStart,
  getFirebaseAuthFailure,
  getFirebaseAuthSuccess
} from './firebase-auth.slice';

describe('firebaseAuth reducer', () => {
  it('should handle initial state', () => {
    expect(firebaseAuthReducer(undefined, { type: '' })).toMatchObject({
      entities: []
    });
  });

  it('should handle get firebaseAuth actions', () => {
    let state = firebaseAuthReducer(undefined, getFirebaseAuthStart());

    expect(state).toEqual({
      loaded: false,
      error: null,
      entities: []
    });

    state = firebaseAuthReducer(state, getFirebaseAuthSuccess([{ id: 1 }]));

    expect(state).toEqual({
      loaded: true,
      error: null,
      entities: [{ id: 1 }]
    });

    state = firebaseAuthReducer(state, getFirebaseAuthFailure('Uh oh'));

    expect(state).toEqual({
      loaded: true,
      error: 'Uh oh',
      entities: [{ id: 1 }]
    });
  });
});
