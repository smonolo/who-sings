import { useEffect } from 'react';

import Landing from '../components/landing';
import Round from '../components/round';
import Results from '../components/results';

import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUsername } from '../store/slices/game';

import './styles.module.css';

export default function App() {
    const { username, rounds, currentRound } = useAppSelector((state: RootState) => state.game);

    const dispatch = useAppDispatch();

    const hasGameData = username && rounds > 0;
    const isGameActive = hasGameData && currentRound > 0 && currentRound <= rounds;

    useEffect(() => {
        const username = localStorage.getItem('who-sings-username');

        if (username) {
            dispatch(setUsername(username));
        }
    }, []);

    if (!hasGameData) {
        return (
            <Landing />
        );
    }

    if (isGameActive) {
        return (
            <Round />
        );
    }

    return (
        <Results />
    );
}