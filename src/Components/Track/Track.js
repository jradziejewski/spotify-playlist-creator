import React from 'react';
import './Track.scss';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist}</p>
                </div>
                <button className="Track-action" onClick={this.addTrack}>
                    +
                </button>
            </div>
        );
    }
}
