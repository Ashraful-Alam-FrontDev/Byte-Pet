
import { configureStore } from '@reduxjs/toolkit';
import petReducer from './petSlice';

export default configureStore({
  reducer: {
    pet: petReducer
  }
});
