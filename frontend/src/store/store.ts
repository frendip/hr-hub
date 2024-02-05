import {configureStore} from '@reduxjs/toolkit';
import specialistsSlice from './slices/specialistsSlice';
import skillsSlice from './slices/skillsSlice';

const store = configureStore({
    reducer: {
        specialists: specialistsSlice,
        skills: skillsSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
