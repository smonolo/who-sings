import { FormEvent, useRef, useState } from 'react';

import styles from './styles.module.css';
import globalStyles from '../../app/styles.module.css';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { incrementRound, setRounds, setUsername } from '../../store/slices/game';

interface State {
    loading: boolean;
    error: string;
}

const initialState: State = {
    loading: false,
    error: ''
};

export default function Landing() {
    const [state, setState] = useState<State>(initialState);

    const formRef = useRef<HTMLFormElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const roundsRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();
    const { username: authUsername } = useAppSelector((state: RootState) => state.game);

    function onGameDataSubmit(event: FormEvent) {
        event.preventDefault();
        setState({ ...initialState, loading: true });

        const username = usernameRef.current;
        const rounds = roundsRef.current;

        if (!formRef.current || !username || !rounds) {
            return setState({ ...initialState, error: 'Could not find refs.' });
        }

        const trimmedUsername = username.value.trim();

        if (!trimmedUsername) {
            return setState({ ...initialState, error: 'Username is required.' });
        }

        if (trimmedUsername.length < 3) {
            return setState({ ...initialState, error: 'Username is too short, it must be at least 3 characters long.' });
        }

        if (trimmedUsername.length > 20) {
            return setState({ ...initialState, error: 'Username is too long, it must be maximum 20 characters long.' });
        }

        if (!rounds.value) {
            return setState({ ...initialState, error: 'Rounds are required.' });
        }

        const roundsNumber = parseInt(rounds.value, 10);

        if (roundsNumber < 1) {
            return setState({ ...initialState, error: 'You must play at least 1 round.' });
        }

        if (roundsNumber > 10) {
            return setState({ ...initialState, error: 'You can play maximum 10 rounds.' });
        }

        formRef.current.reset();
        dispatch(setUsername(trimmedUsername));
        dispatch(setRounds(roundsNumber));
        dispatch(incrementRound());
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.title}>
                    Who Sings
                </div>
                <div className={styles.subtitle}>
                    A music quiz game by Stefano Monolo.
                </div>
                <form
                    ref={formRef}
                    onSubmit={onGameDataSubmit}
                >
                    <div className={styles.spacer}>
                        <div className={globalStyles.label}>
                            Username
                        </div>
                        <input
                            ref={usernameRef}
                            type='text'
                            className={globalStyles.input}
                            placeholder='ProPlayer123'
                            minLength={3}
                            maxLength={20}
                            disabled={state.loading}
                            defaultValue={authUsername || ''}
                            required
                        />
                    </div>
                    <div className={styles.spacer}>
                        <div className={globalStyles.label}>
                            How many rounds? (1-10)
                        </div>
                        <input
                            ref={roundsRef}
                            type='number'
                            className={globalStyles.input}
                            min={1}
                            max={10}
                            defaultValue={5}
                            placeholder='5'
                            disabled={state.loading}
                            required
                        />
                    </div>
                    {state.error && (
                        <div className={styles.spacer}>
                            <div className={globalStyles.error}>
                                {state.error}
                            </div>
                        </div>
                    )}
                    <div className={styles.spacer}>
                        <button
                            type='submit'
                            className={globalStyles.button}
                            disabled={state.loading}
                        >
                            Play Game
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}