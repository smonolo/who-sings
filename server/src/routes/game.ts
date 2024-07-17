import { Router } from 'express'
import { getChartArtists, getChartTracks } from '../lib/chart'
import { getTrackLyrics } from '../lib/track'

const router = Router()

router.get('/data', async (req, res) => {
  const round = parseInt(req.query.round as string, 10)
  const { chartCountry, chartName } = req.query as { [x: string]: string }
  const chartTracks = await getChartTracks(round, { chartCountry, chartName })

  if (chartTracks.error) {
    return res.status(500).json(chartTracks)
  }

  const { track_id, artist_name } = chartTracks
  const trackLyrics = await getTrackLyrics(track_id)

  if (trackLyrics.error) {
    return res.status(500).json(trackLyrics)
  }

  const { lyrics_body } = trackLyrics
  const chartArtists = await getChartArtists(round)

  if (chartArtists.error) {
    return res.status(500).json(chartArtists)
  }

  const { artists } = chartArtists

  res.status(200).json({
    lyrics: lyrics_body,
    artist: artist_name,
    artists
  })
})

export default router
