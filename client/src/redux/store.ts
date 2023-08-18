import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './user.reducer';
import DatesReducer from './dates.reducer';
import FeedbackReducer from './feedback.reducer';

const store = configureStore({
  reducer: {
    UserReducer,
    DatesReducer,
    FeedbackReducer,
  },
});
export default store;