import {
  createSlice,
  createSelector,
  Action,
  PayloadAction
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { error, success } from '@evan-dev/snackbar';
import firebase from 'firebase';
import { generateUserDocument } from './functions/generateUserDoc';

export const FIREBASE_AUTH_FEATURE_KEY = 'firebaseAuth';

export interface FirebaseAuthState {
  user: any;
  persitanceChecked: boolean;
}

export const initialFirebaseAuthState: FirebaseAuthState = {
  user: null,
  persitanceChecked: false
};

export const firebaseAuthSlice = createSlice({
  name: FIREBASE_AUTH_FEATURE_KEY,
  initialState: initialFirebaseAuthState as FirebaseAuthState,
  reducers: {
    authSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    checkedForUser: (state, action: PayloadAction<boolean>) => {
      state.persitanceChecked = action.payload;
    }
  }
});

export const firebaseAuthReducer = firebaseAuthSlice.reducer;

export const { authSuccess, checkedForUser } = firebaseAuthSlice.actions;

export const getFirebaseAuthState = (rootState: any): FirebaseAuthState =>
  rootState[FIREBASE_AUTH_FEATURE_KEY];

export const selectUser = createSelector(getFirebaseAuthState, s => s.user);
export const selectCheckedPersistence = createSelector(getFirebaseAuthState, s => s.persitanceChecked);

export const checkUserPersistance = (): ThunkAction<
  void,
  any,
  null,
  Action<string>
> => async dispatch => {
  new Promise((resolve, reject) => {
    try {
      firebase.auth().onAuthStateChanged(user => {
        console.log('userChecked:', user);
        resolve(user);
      });
    } catch {
      reject('api failed');
    }
  })
  .then(user => generateUserDocument(user))
  .then(userDoc => {
    dispatch(authSuccess(userDoc))
    dispatch(checkedForUser(true))
  })
  .catch(() => {
    console.log('No user stored');
    dispatch(checkedForUser(true))
  })

};

export const signInEmail = (
  email,
  password,
  redirect,
  history
): ThunkAction<void, any, null, Action<string>> => async dispatch => {
  try {
    const credentials = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = await generateUserDocument(credentials.user);
    dispatch(authSuccess(user));
    const message = !!user.displayName
      ? `Login Successful. Welcome back ${user?.displayName}`
      : 'Login Successful';
    console.log(user, message);
    dispatch(success(message));
    history.push(redirect);
  } catch (err) {
    dispatch(error(err.message));
    console.error(err);
  }
};
