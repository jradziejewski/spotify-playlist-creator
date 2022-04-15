import React from 'react';
import './Track.scss';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
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
                        {this.props.track.artist} | {this.props.track.album}
                    </p>
                </div>
                <button className="Track-action">{this.renderAction()}</button>
            </div>
        );
    }
}
