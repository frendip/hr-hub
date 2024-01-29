import {configureStore} from '@reduxjs/toolkit';
import specialistsSlice from './slices/specialistsSlice';

const store = configureStore({
    reducer: {
        specialists: specialistsSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
