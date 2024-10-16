import { createSlice } from '@reduxjs/toolkit';

export type LanguageSelectionState = {
  selectedLanguage: string;
};

const initialState: LanguageSelectionState = {
  selectedLanguage: 'en-SG',
};

export const languageSelectionSlice = createSlice({
  name: 'languageSelection',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSelectionSlice.actions;
export default languageSelectionSlice.reducer;
