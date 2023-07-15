import Modal from "@/components/modal";

import modalStyles from '@/components/modal/styles.module.css';

export default function LeaderboardModal() {
    return (
        <Modal name='leaderboard'>
            <div className={modalStyles.title}>
                Leaderboard
            </div>
        </Modal>
    );
}