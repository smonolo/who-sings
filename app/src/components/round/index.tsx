import { useEffect, useState } from 'react';

import Layout from '@/components/layout';

import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { incrementRound, incrementScore, updateSelections } from '@/store/slices/game';

import { shuffleArray } from '@/utils';

import config from '@/config.json';

import styles from '@/components/round/styles.module.css';
import globalStyles from '@/app/styles.module.css';

interface Data {
    loaded: boolean;
    lyrics: string[];
    artists: string[];
    artist: string;
}

const initialData: Data = {
    loaded: false,
    lyrics: [],
    artists: [],
    artist: ''
};

const { game: { roundDuration } } = config;

export default function Round() {
    const [data, setData] = useState<Data>(initialData);
    const [selectionStatus, setSelectionStatus] = useState<string>('');
    const [countdown, setCountdown] = useState<number>(roundDuration);

    const { currentRound, rounds, score } = useAppSelector((state: RootState) => state.game);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchRoundData();
    }, [currentRound]);

    useEffect(() => {
        if (countdown > 0) {
            if (data.loaded) {
                const interval = setTimeout(() => {
                    setCountdown(countdown => countdown - 1);
                }, 1000);
        
                return () => clearTimeout(interval);
            }
        } else {
            endWithoutSelection();
        }
    }, [countdown, data]);

    useEffect(() => {
        setCountdown(roundDuration);
    }, [currentRound]);

    async function fetchRoundData() {
        const { game: { chartCountry, chartName }, app: { apiUrl } } = config;
        const roundDataResponse = await fetch(apiUrl + 'game/data?' + new URLSearchParams({
            round: currentRound.toString(),
            chartCountry: chartCountry,
            chartName: chartName
        }), {
            method: 'get'
        });
        const roundData = await roundDataResponse.json();

        if (roundData.error) {
            return;
        }

        const formattedData = {
            lyrics: roundData.lyrics.split('\n').splice(0, 3),
            artists: shuffleArray([...roundData.artists, roundData.artist]),
            artist: roundData.artist
        };

        setData({ loaded: true, ...formattedData });
    }

    function nextRound() {
        setTimeout(() => {
            setData(initialData);
            dispatch(incrementRound());
            setSelectionStatus('');
        }, 1000);
    }

    function endWithoutSelection() {
        setSelectionStatus('error');
        dispatch(updateSelections({
            selected: 'Not selected',
            correct: data.artist,
            score: 0
        }));

        nextRound();
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

        nextRound();
    }

    if (!data.loaded) {
        return (
            <Layout
                title='Who Sings?'
                subtitle={`Round ${currentRound}/${rounds} | ${countdown}s`}
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
            subtitle={`Round ${currentRound}/${rounds} | ${countdown}s`}
        >
            <div className={styles.pointsRow}>
                <div />
                <div className={styles.points}>
                    {score} points
                </div>
                {selectionStatus === 'success' && (
                    <div className={styles.selectionSuccess}>
                        Correct!
                    </div>
                )}
                {selectionStatus === 'error' && (
                    <div className={styles.selectionError}>
                        Wrong!
                    </div>
                )}
            </div>
            <div className={globalStyles.spacer}>
                <div className={globalStyles.card + ' ' + styles.card + ' ' + styles.cardLyrics}>
                    {data.lyrics.map((line, index) => (
                        <div key={index}>
                            {line}
                        </div>
                    ))}
                </div>
            </div>
            <div className={globalStyles.spacer}>
                <div className={styles.row}>
                    {data.artists.map(((artist, index) => (
                        <div
                            key={index}
                            className={globalStyles.card + ' ' + styles.card + ' ' + styles.cardSelection}
                            onClick={() => !selectionStatus && selectArtist(artist)}
                        >
                            {artist}
                        </div>
                    )))}
                </div>
            </div>
        </Layout>
    );
}