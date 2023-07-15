import { useEffect, useState } from 'react';

import Layout from '../layout';

import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { incrementRound, incrementScore } from '../../store/slices/game';

import { shuffleArray } from '../../utils';

import styles from './styles.module.css';
import globalStyles from '../../app/styles.module.css';

interface Data {
    lyrics: string;
    artists: string[];
    artist: string;
}

const initialData: Data = {
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

        setData(formattedData);
    }

    function selectArtist(name: string) {
        if (name === data.artist) {
            setSelectionStatus('success');
            dispatch(incrementScore());
        } else {
            setSelectionStatus('error');
        }

        setTimeout(() => {
            dispatch(incrementRound());
            setSelectionStatus('');
        }, 2000);
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