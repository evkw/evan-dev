import {
  adminReducer,
  getAdminStart,
  getAdminFailure,
  getAdminSuccess
} from './admin.slice';

describe('admin reducer', () => {
  it('should handle initial state', () => {
    expect(adminReducer(undefined, { type: '' })).toMatchObject({
      entities: []
    });
  });

  it('should handle get admin actions', () => {
    let state = adminReducer(undefined, getAdminStart());

    expect(state).toEqual({
      loaded: false,
      error: null,
      entities: []
    });

    state = adminReducer(state, getAdminSuccess([{ id: 1 }]));

    expect(state).toEqual({
      loaded: true,
      error: null,
      entities: [{ id: 1 }]
    });

    state = adminReducer(state, getAdminFailure('Uh oh'));

    expect(state).toEqual({
      loaded: true,
      error: 'Uh oh',
      entities: [{ id: 1 }]
    });
  });
});
