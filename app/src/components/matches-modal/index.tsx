import { useEffect, useState } from "react";

import { Match as MatchType, getMatches } from "@/lib/game";

import Modal from "@/components/modal";
import Match from '@/components/match';

import modalStyles from '@/components/modal/styles.module.css';
import globalStyles from '@/app/styles.module.css';
import styles from '@/components/matches-modal/styles.module.css';

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

export default function MatchesModal() {
    const [matches, setMatches] = useState<MatchType[] | string>('');
    const [filter, setFilter] = useState<string>('all');

    const { username } = useAppSelector((state: RootState) => state.game);

    useEffect(() => {
        const storedMatches = getMatches(filter === 'user' ? username : '');

        setMatches(storedMatches);
    }, [filter]);

    return (
        <Modal name='matches'>
            <div className={styles.row}>
                <div className={modalStyles.title}>
                    Matches
                </div>
                <div className={styles.badges}>
                    <div
                        className={styles.badge + ' ' + (filter === 'all' ? styles.activeBadge : '')}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </div>
                    {username && (
                        <div
                            className={styles.badge + ' ' + (filter === 'user' ? styles.activeBadge : '')}
                            onClick={() => setFilter('user')}
                        >
                            My Games
                        </div>
                    )}
                </div>
            </div>
            {typeof matches === 'string' && (
                <div className={globalStyles.smallSpacer}>
                    {matches}
                </div>
            )}
            {Array.isArray(matches) && (
                <div className={styles.list + ' ' + globalStyles.smallSpacer}>
                    {matches.map((match) => (
                        <Match
                            key={match.id}
                            {...match}
                        />
                    ))}
                </div>
            )}
        </Modal>
    );
}