import React from 'react';
import './Track.scss';

export class Track extends React.Component {
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist}</p>
                </div>
                {/* <button class="Track-action"><!-- + or - will go here --></button> */}
            </div>
        );
    }
}
