import { useEffect, useState } from 'react';

import Layout from '@/components/layout';

import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { incrementRound, incrementScore, updateSelections } from '@/store/slices/game';

import { shuffleArray } from '@/utils';

import styles from '@/components/round/styles.module.css';
import globalStyles from '@/app/styles.module.css';

interface Data {
    loaded: boolean;
    lyrics: string;
    artists: string[];
    artist: string;
}

const initialData: Data = {
    loaded: false,
    lyrics: '',
    artists: [],
    artist: ''
}

export default function Round() {
    const [data, setData] = useState<Data>(initialData);
    const [selectionStatus, setSelectionStatus] = useState<string>('');

    const { currentRound, rounds, score } = useAppSelector((state: RootState) => state.game);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchRoundData();
    }, [currentRound]);

    async function fetchRoundData() {
        const roundDataResponse = await fetch(`http://localhost:8080/game/data?round=${currentRound}`, {
            method: 'get'
        });
        const roundData = await roundDataResponse.json();

        if (roundData.error) {
            return;
        }

        const formattedData = {
            lyrics: roundData.lyrics.split('\n')[0],
            artists: shuffleArray([...roundData.artists, roundData.artist]),
            artist: roundData.artist
        };

        setData({ loaded: true, ...formattedData });
    }

    function selectArtist(name: string) {
        const isCorrectAnswer = name === data.artist;

        if (isCorrectAnswer) {
            setSelectionStatus('success');
            dispatch(incrementScore());
        } else {
            setSelectionStatus('error');
        }

        dispatch(updateSelections({
            selected: name,
            correct: data.artist,
            score: isCorrectAnswer ? 100 : 0
        }));

        setTimeout(() => {
            dispatch(incrementRound());
            setSelectionStatus('');
        }, 2000);
    }

    if (!data.loaded) {
        return (
            <Layout
                title='Who Sings?'
                subtitle={`Round ${currentRound}/${rounds}`}
            >
                <div className={globalStyles.spacer}>
                    <div className={styles.loading}>
                        Loading round...
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            title='Who Sings?'
            subtitle={`Round ${currentRound}/${rounds}`}
        >
            <div className={styles.points}>
                {score} points
            </div>
            <div className={globalStyles.spacer}>
                <div className={styles.card}>
                    {data.lyrics}
                </div>
            </div>
            <div className={globalStyles.spacer}>
                <div className={styles.row}>
                    {data.artists.map(((artist, index) => (
                        <div
                            key={index}
                            className={styles.card + ' ' + styles.cardSelection}
                            onClick={() => selectArtist(artist)}
                        >
                            {artist}
                        </div>
                    )))}
                </div>
            </div>
            {selectionStatus === 'success' && (
                <div className={globalStyles.spacer}>
                    <div className={styles.selectionSuccess}>
                        Correct! +100 points!
                    </div>
                </div>
            )}
            {selectionStatus === 'error' && (
                <div className={globalStyles.spacer}>
                    <div className={styles.selectionError}>
                        Incorrect! It was {data.artist}!
                    </div>
                </div>
            )}
        </Layout>
    );
}