import React from 'react';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import './App.scss';

export class App extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    Easy<span className="highlight">Spoti</span>Playlist
                </h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                        <SearchResults />
                        <Playlist />
                    </div>
                </div>
            </div>
        );
    }
}
