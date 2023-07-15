import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Selection {
    selected: string;
    correct: string;
    score: number;
}

interface GameState {
    username: string;
    rounds: number;
    currentRound: number;
    score: number;
    selections: Selection[];
}

const initialState: GameState = {
    username: '',
    rounds: 0,
    currentRound: 0,
    score: 0,
    selections: []
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
        incrementScore: state => {
            state.score += 100;
        },
        updateSelections: (state, action: PayloadAction<Selection>) => {
            state.selections = [...state.selections, action.payload];
        },
        resetGameData: state => {
            const { rounds, currentRound, score, selections } = initialState;

            state.rounds = rounds;
            state.currentRound = currentRound;
            state.score = score;
            state.selections = selections;
        }
    }
});

export const {
    setUsername,
    setRounds,
    incrementRound,
    incrementScore,
    updateSelections,
    resetGameData
} = gameSlice.actions;

export default gameSlice.reducer;