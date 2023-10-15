import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  sendBox: [],
};
const SendReducer = createSlice({
  name: 'SendBox',
  initialState,
  reducers: {
    updateSendBox(state, action) {
      state.sendBox = action.payload;
    },
  },
});
export const { updateSendBox } = SendReducer.actions;
export default SendReducer.reducer;
