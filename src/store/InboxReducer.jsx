import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  inbox: [],
  totalMails: 0,
};
const InboxReducer = createSlice({
  name: 'Inbox',
  initialState,
  reducers: {
    updateData(state, action) {
      state.inbox = action.payload;
    },
    updateSeen(state, action) {
      console.log(state.inbox);
      state.inbox[action.payload].seen = true;
    },
    updateTrash(state, action) {
      state.inbox[action.payload].isDeleted = true;
    },
  },
});
export const { updateData, updateSeen, updateTrash } = InboxReducer.actions;
export default InboxReducer.reducer;
