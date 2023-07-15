import Layout from "../layout";

import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetGameData } from "../../store/slices/game";

import globalStyles from '../../app/styles.module.css';

export default function Results() {
    const { score } = useAppSelector((state: RootState) => state.game);
    const dispatch = useAppDispatch();

    function playAgain() {
        dispatch(resetGameData());
    }

    return (
        <Layout
            title='Who Sings'
            subtitle="Let's see how you did."
        >
            <div className={globalStyles.spacer}>
                {score} points!
            </div>
            <div className={globalStyles.spacer}>
                <button
                    className={globalStyles.button}
                    onClick={playAgain}
                >
                    Play Again
                </button>
            </div>
        </Layout>
    );
}