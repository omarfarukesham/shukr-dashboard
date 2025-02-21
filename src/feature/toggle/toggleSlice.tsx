import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  value: boolean;
}

const initialState: ToggleState = {
  value: true,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;
