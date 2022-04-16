import React from 'react';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';
import './App.scss';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            searchResults: [],
            playlistName: 'New Playlist',
            playlistTracks: [],
        };
    }

    addTrack(track) {
        if (this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
            return;
        } else {
            let tracks = this.state.playlistTracks;
            tracks.push(track);
            this.setState({ playlistTracks: tracks });
            this.setState({
                searchResults: this.state.searchResults.filter(
                    (result) => !this.state.playlistTracks.includes(result),
                ),
            });
        }
    }

    removeTrack(track) {
        let tracks = this.state.playlistTracks;
        this.setState({
            playlistTracks: tracks.filter((current) => current.id !== track.id),
        });
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist() {
        const trackURIs = this.state.playlistTracks.map((track) => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
            this.setState({
                playlistName: 'New Playlist',
                playlistTracks: [],
            });
        });
    }

    search(term) {
        Spotify.search(term).then((searchResults) => {
            this.setState({ searchResults: searchResults });
        });
    }

    render() {
        return (
            <div>
                <h1>
                    Easy<span className="highlight">Spoti</span>Playlist
                </h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                        />
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
