import { configureStore } from "@reduxjs/toolkit";

import gameReducer from '@/store/slices/game';
import appReducer from '@/store/slices/app';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        app: appReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;