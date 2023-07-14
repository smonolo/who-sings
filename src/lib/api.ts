import { apiKey, apiUrl } from "../utils/constants";

export async function getRoundData(round: number) {
    const chartTracksRes = await fetch(apiUrl + 'chart.tracks.get?' + new URLSearchParams({
        chart_name: 'hot',
        page: round.toString(),
        page_size: '1',
        country: 'it',
        f_has_lyrics: '1',
        apikey: apiKey
    }), {
        method: 'get'
    });
    const chartTracks = await chartTracksRes.json();
    const { message: { header: chartTracksHeader, body: chartTracksBody } } = chartTracks;

    if (chartTracksHeader.status_code !== 200) {
        return {
            error: 'Unable to get chart tracks.'
        };
    }

    const { track_list } = chartTracksBody;
    const { track: { track_id, artist_name } } = track_list[0];

    if (!track_id) {
        return {
            error: 'Unable to get track ID.'
        };
    }

    if (!artist_name) {
        return {
            error: 'Unable to get track artist.'
        };
    }

    const trackLyricsRes = await fetch(apiUrl + 'track.lyrics.get?' + new URLSearchParams({
        track_id,
        apikey: apiKey
    }), {
        method: 'get'
    });
    const trackLyrics = await trackLyricsRes.json();
    const { message: { header: trackLyricsHeader, body: trackLyricsBody } } = trackLyrics;

    if (trackLyricsHeader.status_code !== 200) {
        return {
            error: 'Unable to get track lyrics.'
        };
    }

    const { lyrics: { lyrics_body } } = trackLyricsBody;

    if (!lyrics_body) {
        return {
            error: 'Unable to get lyrics.'
        };
    }

    const chartArtistsRes = await fetch(apiUrl + 'chart.artists.get?' + new URLSearchParams({
        page: round.toString(),
        page_size: '2',
        country: 'it',
        apikey: apiKey
    }), {
        method: 'get'
    });
    const chartArtists = await chartArtistsRes.json();
    const { message: { header: chartArtistsHeader, body: chartArtistsBody } } = chartArtists;

    if (chartArtistsHeader.status_code !== 200) {
        return {
            error: 'Unable to get chart artists.'
        };
    }

    const { artist_list } = chartArtistsBody;
    const artists = artist_list.map((a: any) => a.artist.artist_name);
    
    return {
        lyrics: lyrics_body,
        artist: artist_name,
        artists
    };
}