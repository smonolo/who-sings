import { useEffect, useState } from 'react';

import { RootState } from '../../store';
import { useAppSelector } from '../../store/hooks';

import { shuffleArray } from '../../utils';

import styles from './styles.module.css';

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

    const { currentRound } = useAppSelector((state: RootState) => state.game);

    useEffect(() => {
        fetchRoundData();
    }, [currentRound]);

    const fetchRoundData = async () => {
        const roundDataResponse = await fetch(`http://localhost:8080/game/data?round=${currentRound}`, {
            method: 'get'
        });
        const roundData = await roundDataResponse.json();

        if (roundData.error) {
            return;
        }

        const formattedData = {
            lyrics: roundData.lyrics.split('\n')[Math.floor(Math.random() * 5) + 1],
            artists: shuffleArray([...roundData.artists, roundData.artist]),
            artist: roundData.artist
        };

        setData(formattedData);
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.title}>
                    Who Sings?
                </div>
                <div className={styles.spacer}>
                    <div className={styles.card}>
                        {data.lyrics}
                    </div>
                </div>
                <div className={styles.spacer}>
                    <div className={styles.row}>
                        {data.artists.map(((artist, index) => (
                            <div
                                key={index}
                                className={styles.card}
                            >
                                {artist}
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    );
}