import axios from "axios";

import { apiKey, apiUrl } from "../utils/constants";

export async function getTrackLyrics(track_id: number) {
    const response = await axios.get(
        apiUrl + 'track.lyrics.get?' + new URLSearchParams({
            track_id: track_id.toString(),
            apikey: apiKey
        })
    );

    if (!response || !response.data) {
        return {
            error: 'Failed to retrieve track lyrics.'
        };
    }

    const { message: { header, body } } = response.data;

    if (header.status_code !== 200) {
        return {
            error: 'Unable to retrieve track lyrics.'
        };
    }

    const { lyrics: { lyrics_body } } = body;

    if (!lyrics_body) {
        return {
            error: 'Unable to retrieve lyrics.'
        };
    }

    return {
        lyrics_body
    };
}