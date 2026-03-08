import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    darkMode: false,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            if (state.darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
            if (action.payload) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
    },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
