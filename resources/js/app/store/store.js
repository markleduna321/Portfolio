import { configureStore } from '@reduxjs/toolkit';
import portfolioSlice from '../pages/portfolio/_redux/portfolio-slice';
import themeSlice from '../pages/portfolio/_redux/theme-slice';

const store = configureStore({
    reducer: {
        portfolio: portfolioSlice,
        theme: themeSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
