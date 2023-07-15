import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
    username: string;
    rounds: number;
    currentRound: number;
    score: number;
}

const initialState: GameState = {
    username: '',
    rounds: 0,
    currentRound: 0,
    score: 0
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            const username = action.payload;

            state.username = username;

            localStorage.setItem('who-sings-username', username);
        },
        setRounds: (state, action: PayloadAction<number>) => {
            state.rounds = action.payload;
        },
        incrementRound: state => {
            state.currentRound += 1;
        },
        incrementScoreByAmount: (state, action: PayloadAction<number>) => {
            state.score += action.payload;
        }
    }
});

export const {
    setUsername,
    setRounds,
    incrementRound,
    incrementScoreByAmount
} = gameSlice.actions;

export default gameSlice.reducer;