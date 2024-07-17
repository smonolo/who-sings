import Modal from '@/components/modal'
import modalStyles from '@/components/modal/styles.module.css'
import globalStyles from '@/app/styles.module.css'
import styles from '@/components/leaderboard-modal/styles.module.css'
import { getLeaderboard } from '@/lib/game'

export default function LeaderboardModal() {
  const leaderboard = getLeaderboard()
  const headers = [
    'Position',
    'Username',
    'Score',
    'Matches',
    'Rounds',
    'Win %'
  ]

  return (
    <Modal name="leaderboard">
      <div className={modalStyles.title}>Leaderboard</div>
      {typeof leaderboard === 'string' && (
        <div className={globalStyles.smallSpacer}>{leaderboard}</div>
      )}
      {leaderboard.length === 0 && (
        <div className={globalStyles.smallSpacer}>No players to show.</div>
      )}
      {leaderboard.length > 0 && Array.isArray(leaderboard) && (
        <div className={globalStyles.smallSpacer}>
          <table className={styles.table}>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
            {leaderboard.map((user, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.score}</td>
                <td>{user.matches}</td>
                <td>{user.rounds}</td>
                <td>{user.winPercentage}%</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </Modal>
  )
}
