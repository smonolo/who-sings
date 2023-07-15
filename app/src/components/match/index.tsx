import globalStyles from '@/app/styles.module.css';
import styles from '@/components/match/styles.module.css';

import { Match as MatchType } from '@/lib/game';

import { formatTime, getDuration } from '@/utils';

interface MatchRowProps {
    label: string;
    value: string | number;
}

function MatchRow(props: MatchRowProps) {
    return (
        <div className={styles.grid}>
            <div className={globalStyles.text}>
                {props.label}
            </div>
            <div>{props.value}</div>
        </div>
    );
}

export default function Match(props: MatchType) {
    const rounds = props.selections.length;
    const maxScore = rounds * 100;
    const rows = [
        {
            label: 'Username',
            value: props.username
        },
        {
            label: 'Duration',
            value: `${getDuration(props.finishTime - props.startTime)}s (${formatTime(props.startTime)} -> ${formatTime(props.finishTime)})`
        },
        {
            label: 'Score',
            value: `${props.score}/${maxScore} (${Math.floor(props.score / maxScore * 100)}%, ${rounds} round${rounds > 1 ? 's' : ''})`
        },
        ...props.selections.map((s, i) => ({
            label: `Round #${i + 1}`,
            value: `${s.score === 100 ? 'Correct!' : 'Wrong!'} (${s.correct}, ${s.selected})`
        }))
    ];

    return (
        <div className={globalStyles.card + ' ' + styles.card}>
            {rows.map((row, index) => (
                <MatchRow
                    key={index}
                    {...row}
                />
            ))}
        </div>
    );
}