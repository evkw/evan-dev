import {
  createSlice,
  createSelector,
  Action,
  PayloadAction
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { error, success, info } from '@evan-dev/snackbar';
import firebase from 'firebase';
import { uploadFilesRequest } from './hooks/upload';
import { deleteFromFirebase } from './hooks/delete';
import { editRecord } from './hooks/edit';

export const GALLERY_FEATURE_KEY = 'gallery';
export type GalleryError = any;
export interface GalleryEntity {
  id: number;
}

export interface GalleryState {
  entities: any;
  loaded: boolean;
  fileUploading: boolean;
  error: GalleryError;
  selectedItemId: string;
}

export const initialGalleryState: GalleryState = {
  entities: null,
  loaded: false,
  fileUploading: false,
  error: null,
  selectedItemId: null,
};

export const gallerySlice = createSlice({
  name: GALLERY_FEATURE_KEY,
  initialState: initialGalleryState as GalleryState,
  reducers: {
    getGalleryStart: (state, action: PayloadAction<undefined>) => {
      state.loaded = false;
    },
    getGallerySuccess: (state, action: PayloadAction<any>) => {
      state.loaded = true;
      state.entities = action.payload;
    },
    getGalleryFailure: (state, action: PayloadAction<GalleryError>) => {
      state.error = action.payload;
    },
    setFileLoading: (state, action: PayloadAction<boolean>) => {
      state.fileUploading = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<string>) => {
      state.selectedItemId = action.payload;
    },
    clearSelected: (state) => {
      state.selectedItemId = null;
    }
  }
});

export const galleryReducer = gallerySlice.reducer;

export const {
  getGalleryStart,
  getGallerySuccess,
  getGalleryFailure,
  setFileLoading,
  setSelectedItem,
  clearSelected
} = gallerySlice.actions;

export const getGalleryState = (rootState: any): GalleryState =>
  rootState[GALLERY_FEATURE_KEY];

export const selectGalleryEntities = createSelector(
  getGalleryState,
  s => s.entities
);

export const selectGalleryLoaded = createSelector(
  getGalleryState,
  s => s.loaded
);

export const selectFileUploading = createSelector(
  getGalleryState,
  s => s.fileUploading
);

export const selectSelectedItemId = createSelector(
  getGalleryState,
  s => s.selectedItemId
);

export const selectGalleryError = createSelector(getGalleryState, s => s.error);

export const uploadFiles = (files: FileList): ThunkAction<void, any, null, Action<any>> => async dispatch => {
  try {
    dispatch(setFileLoading(true));
    const documentData = await uploadFilesRequest(files)
    dispatch(getGalleryEntities());
    dispatch(setFileLoading(false));
    dispatch(success(`${documentData.length} files uploaded successfully`))

  } catch(err) {
    console.error(err);
    dispatch(setFileLoading(false));
    dispatch(error('Some files were not uploaded successfully'));
  }
}

export const deleteFile = (item: any): ThunkAction<void, any, null, Action<string>> => async dispatch => {
  try {
    const {id, name} = item;
    dispatch(info(`Deleting ${name}...`))
    await deleteFromFirebase(id);
    dispatch(getGalleryEntities());
    dispatch(success(`${name} Deleted Successfully`))
  } catch(err) {
    console.error(err);
    dispatch(error('Unable to delete file'));
  }
}


export const getGalleryEntities = (): ThunkAction<void, any, null, Action<string>> => async dispatch => {
  try {
    dispatch(getGalleryStart());
    const snapshot = await firebase.firestore().collection('gallery').get();
    const data = snapshot.docs.map(d => Object.assign({}, {id: d.id, ...d.data()}));
    dispatch(getGallerySuccess(data));

  } catch(err) {
    console.error(err);
    dispatch(getGalleryFailure(err));
    dispatch(error('Unable to load gallery'));
  }
}

export const editGalleryRecord = (item: any): ThunkAction<void, any, null, Action<string>> => async dispatch => {
  try {
    dispatch(info(`Updating record...`))
    await editRecord(item);
    dispatch(getGalleryEntities());
    dispatch(success(`Update Successful`))
  } catch(err) {
    console.error(err);
    dispatch(error('Unable to delete file'));
  }
}