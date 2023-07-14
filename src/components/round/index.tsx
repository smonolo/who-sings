import { useEffect, useState } from 'react';

import { RootState } from '../../store';
import { useAppSelector } from '../../store/hooks';

import { getRoundData } from '../../lib/api';

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

    function shuffleArtistsList(artists: string[]) {
        let currentIndex = artists.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [artists[currentIndex], artists[randomIndex]] = [artists[randomIndex], artists[currentIndex]];
        }

        return artists;
    }

    const fetchRoundData = async () => {
        const roundData = await getRoundData(currentRound);

        if (roundData.error) {
            return;
        }

        const formattedData = {
            lyrics: roundData.lyrics,
            artists: shuffleArtistsList([...roundData.artists, roundData.artist]),
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