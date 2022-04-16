import { config } from '../config.js';

let token;
const clientID = config.clientID;
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
        if (token) return token;

        // Checking for access token match
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenMatch && expiresInMatch) {
            token = tokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => (token = ''), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return token;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const token = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) return [];
                return jsonResponse.tracks.items.map((track) => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    image: track.album.images[0].url,
                    preview: track.preview_url,
                    uri: track.uri,
                }));
            });
    },
    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs) return;
        const token = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };
        let userID;

        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then((response) => response.json())
            .then((jsonResponse) => {
                userID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: playlistName }),
                })
                    .then((response) => response.json())
                    .then((jsonResponse) => {
                        const playlistID = jsonResponse.id;
                        return fetch(
                            `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                            {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({ uris: trackURIs }),
                            },
                        );
                    });
            });
    },
};

export default Spotify;
