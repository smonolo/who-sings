import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Layout from '@/components/layout'
import Match from '@/components/match'
import { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { resetGameData } from '@/store/slices/game'
import globalStyles from '@/app/styles.module.css'

export default function Results() {
  const game = useAppSelector((state: RootState) => state.game)
  const dispatch = useAppDispatch()
  const match = {
    id: uuidv4(),
    startTime: game.startTime,
    finishTime: new Date().getTime(),
    username: game.username,
    score: game.score,
    selections: game.selections
  }

  useEffect(() => {
    const storageItemName = 'who-sings-matches'
    const storedMatches = localStorage.getItem(storageItemName)

    if (storedMatches) {
      const rawMatches: any[] = JSON.parse(storedMatches)

      localStorage.setItem(
        storageItemName,
        JSON.stringify([...rawMatches, match])
      )
    } else {
      localStorage.setItem(storageItemName, JSON.stringify([match]))
    }
  }, [])

  return (
    <Layout title="Who Sings" subtitle="Let's see how you did.">
      <div className={globalStyles.spacer}>
        <Match {...match} />
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
  )
}
