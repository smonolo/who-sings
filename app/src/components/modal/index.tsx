import { Fragment, ReactNode } from 'react';

import styles from '@/components/modal/styles.module.css';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { resetModal } from '@/store/slices/app';

interface Props {
    name: string;
    children: ReactNode;
}

export default function Modal(props: Props) {
    const { modal } = useAppSelector((state: RootState) => state.app);
    const dispatch = useAppDispatch();

    if (modal !== props.name) {
        return (
            <Fragment />
        );
    };

    return (
        <div
            className={styles.container}
            onClick={() => dispatch(resetModal())}
        >
            <div
                className={styles.box}
                onClick={event => event.stopPropagation()}
            >
                {props.children}
            </div>
        </div>
    );
}