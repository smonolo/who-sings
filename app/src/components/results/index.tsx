import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import Layout from "@/components/layout";

import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetGameData } from "@/store/slices/game";

import globalStyles from '@/app/styles.module.css';

export default function Results() {
    const game = useAppSelector((state: RootState) => state.game);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const match = {
            id: uuidv4(),
            finishTime: new Date().getTime(),
            username: game.username,
            score: game.score,
            selections: game.selections
        };
        const storageItemName = 'who-sings-matches';
        const storedMatches = localStorage.getItem(storageItemName);

        if (storedMatches) {
            const rawMatches = JSON.parse(storedMatches);

            localStorage.setItem(storageItemName, JSON.stringify([...rawMatches, match]));
        } else {
            localStorage.setItem(storageItemName, JSON.stringify([match]));
        }
    }, []);

    return (
        <Layout
            title='Who Sings'
            subtitle="Let's see how you did."
        >
            <div className={globalStyles.spacer}>
                {game.score} points!
            </div>
            <div className={globalStyles.spacer}>
                <button
                    className={globalStyles.button + ' ' + globalStyles.center}
                    onClick={() => dispatch(resetGameData())}
                >
                    Play Again
                </button>
            </div>
        </Layout>
    );
}