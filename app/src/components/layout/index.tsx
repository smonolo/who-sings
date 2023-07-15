import { ReactNode } from 'react';

import styles from './styles.module.css';

interface Props {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export default function Layout(props: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.title}>
                    {props.title}
                </div>
                <div className={styles.subtitle}>
                    {props.subtitle}
                </div>
                {props.children}
            </div>
        </div>
    );
}