import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  value: sessionStorage.getItem('sessionToken') || ''
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSession: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const payload = action.payload;

      state.value = payload.sessionToken;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.value;

      if (payload.rememberMe) {
        sessionStorage.setItem('sessionToken', state.value);
      }
    },
    clearSession: (state) => {
      state.value = '';
      axios.defaults.headers.common['Authorization'] = undefined;
      sessionStorage.removeItem('sessionToken');
    }
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.session.value)`
export const selectSession = (state) => state.session.value;

export default sessionSlice.reducer;
