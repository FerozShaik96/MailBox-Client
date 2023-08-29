import { configureStore } from '@reduxjs/toolkit';
import InboxReducer from './InboxReducer';
import SendReducer from './SendReducer';

const store = configureStore({
  reducer: {
    inboxReducer: InboxReducer,
    sendRedcuer: SendReducer,
  },
});
export default store;
