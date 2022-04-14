import React from 'react';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import './App.scss';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.state = {
            searchResults: [
                { name: 'name4', artist: 'artist4', album: 'album4', id: 4 },
                { name: 'name5', artist: 'artist5', album: 'album5', id: 5 },
                { name: 'name6', artist: 'artist6', album: 'album6', id: 6 },
            ],
            playlistName: 'playlist name',
            playlistTracks: [
                { name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
                { name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
                { name: 'name3', artist: 'artist3', album: 'album3', id: 3 },
            ],
        };
    }

    addTrack(track) {
        if (this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
            return;
        } else {
            let tracks = this.state.playlistTracks;
            tracks.push(track);
            this.setState({ playlistTracks: tracks });
        }
    }

    render() {
        return (
            <div>
                <h1>
                    Easy<span className="highlight">Spoti</span>Playlist
                </h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                        />
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
