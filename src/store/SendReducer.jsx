import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  sendBox: [],
};
const SendReducer = createSlice({
  name: 'SendBox',
  initialState,
  reducers: {
    updateData(state, action) {
      state.sendBox = action.payload;
    },
  },
});
export const SendActions = SendReducer.actions;
export default SendReducer.reducer;
