import { FormEvent, useRef, useState } from 'react';

import Layout from '@/components/layout';

import globalStyles from '@/app/styles.module.css';
import styles from '@/components/landing/styles.module.css';

import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { incrementRound, setRounds, setUsername } from '@/store/slices/game';
import { setModal } from '@/store/slices/app';

import { validateLandingForm } from '@/utils';

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

        const validatedForm = validateLandingForm(username.value, rounds.value);

        if (typeof validatedForm === 'string') {
            return setState({ ...initialState, error: validatedForm });
        }

        formRef.current.reset();

        dispatch(setUsername(validatedForm.username));
        dispatch(setRounds(validatedForm.rounds));
        dispatch(incrementRound());
    }

    function deleteAllData() {
        localStorage.removeItem('who-sings-matches');
        localStorage.removeItem('who-sings-username');

        window.location.reload();
    }

    return (
        <Layout
            title='Who Sings'
            subtitle='A music quiz game by Stefano Monolo.'
        >
            <form
                ref={formRef}
                onSubmit={onGameDataSubmit}
            >
                <div className={globalStyles.spacer}>
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
                <div className={globalStyles.spacer}>
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
                    <div className={globalStyles.spacer}>
                        <div className={globalStyles.error}>
                            {state.error}
                        </div>
                    </div>
                )}
                <div className={globalStyles.spacer + ' ' + styles.row}>
                    <button
                        type='submit'
                        className={globalStyles.button}
                        disabled={state.loading}
                    >
                        Play Game
                    </button>
                    <div
                        className={globalStyles.button + ' ' + globalStyles.buttonSecondary}
                        onClick={() => dispatch(setModal('matches'))}
                    >
                        Matches
                    </div>
                    <div
                        className={globalStyles.button + ' ' + globalStyles.buttonSecondary}
                        onClick={() => dispatch(setModal('leaderboard'))}
                    >
                        Leaderboard
                    </div>
                </div>
                <div className={globalStyles.spacer}>
                    <div
                        className={styles.deleteData}
                        onClick={deleteAllData}
                    >
                        Delete all data
                    </div>
                </div>
            </form>
        </Layout>
    );
}