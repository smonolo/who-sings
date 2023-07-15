import axios from 'axios';

import { apiKey, apiUrl } from '../utils/constants';

export async function getChartTracks(round: number) {
    const response = await axios.get(
        apiUrl + 'chart.tracks.get?' + new URLSearchParams({
            chart_name: 'hot',
            page: round.toString(),
            page_size: '1',
            country: 'it',
            f_has_lyrics: '1',
            apikey: apiKey
        })
    );

    if (!response || !response.data) {
        return {
            error: 'Failed to retrieve chart tracks.'
        };
    }

    const { message: { header, body } } = response.data;

    if (header.status_code !== 200) {
        return {
            error: 'Unable to retrieve chart tracks.'
        };
    }
    
    const { track_list } = body;
    const { track: { track_id, artist_name } } = track_list[0];

    if (!track_id) {
        return {
            error: 'Unable to retrieve track ID.'
        };
    }

    if (!artist_name) {
        return {
            error: 'Unable to retrieve track artist.'
        };
    }

    return {
        track_id,
        artist_name
    };
}

export async function getChartArtists(round: number) {
    const response = await axios.get(
        apiUrl + 'chart.artists.get?' + new URLSearchParams({
            page: round.toString(),
            page_size: '2',
            country: 'it',
            apikey: apiKey
        })
    );

    if (!response || !response.data) {
        return {
            error: 'Failed to retrieve chart artists.'
        };
    }

    const { message: { header, body } } = response.data;

    if (header.status_code !== 200) {
        return {
            error: 'Unable to retrieve chart artists.'
        };
    }

    const { artist_list } = body;
    const artists = artist_list.map((a: any) => a.artist.artist_name);

    return {
        artists
    };
}