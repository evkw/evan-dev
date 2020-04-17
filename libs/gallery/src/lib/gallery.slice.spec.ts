import {
  galleryReducer,
  getGalleryStart,
  getGalleryFailure,
  getGallerySuccess
} from './gallery.slice';

describe('gallery reducer', () => {
  it('should handle initial state', () => {
    expect(galleryReducer(undefined, { type: '' })).toMatchObject({
      entities: []
    });
  });

  it('should handle get gallery actions', () => {
    let state = galleryReducer(undefined, getGalleryStart());

    expect(state).toEqual({
      loaded: false,
      error: null,
      entities: []
    });

    state = galleryReducer(state, getGallerySuccess([{ id: 1 }]));

    expect(state).toEqual({
      loaded: true,
      error: null,
      entities: [{ id: 1 }]
    });

    state = galleryReducer(state, getGalleryFailure('Uh oh'));

    expect(state).toEqual({
      loaded: true,
      error: 'Uh oh',
      entities: [{ id: 1 }]
    });
  });
});
