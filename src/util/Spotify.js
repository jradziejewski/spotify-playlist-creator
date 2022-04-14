import { config } from '../../config.js';

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
};

export default Spotify;
