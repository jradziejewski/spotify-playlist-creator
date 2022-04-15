import React from 'react';
import './Track.scss';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playPause = this.playPause.bind(this);
        this.state = {
            audio: new Audio(this.props.track.preview),
            isPlaying: false,
        };
        this.state.audio.volume = 0.06;
    }

    playPause() {
        let isPlaying = this.state.isPlaying;
        if (isPlaying) {
            this.state.audio.pause();
        } else {
            this.state.audio.play();
        }
        this.setState({ isPlaying: !isPlaying });
    }
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return (
                <button className="Track-action" onClick={this.removeTrack}>
                    -
                </button>
            );
        } else
            return (
                <button className="Track-action" onClick={this.addTrack}>
                    +
                </button>
            );
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-image">
                    <img src={this.props.track.image} alt="album" width="50px" height="50px" />
                </div>
                <div className="Track-information">
                    <h4>{this.props.track.name}</h4>
                    <p>
                        🎵 {this.props.track.artist} | 💿 {this.props.track.album}
                    </p>
                </div>
                <button className="Track-play" onClick={this.playPause}>
                    {this.state.isPlaying ? (
                        <img src="circle-stop-solid.svg" alt="Stop" />
                    ) : (
                        <img src="circle-play-solid.svg" alt="Play" />
                    )}
                </button>
                {this.renderAction()}
            </div>
        );
    }
}
