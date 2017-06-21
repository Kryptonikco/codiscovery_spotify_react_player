import React from 'react';

class Player extends React.Component {
  render() {
    const {
      name,
      artist,
      album,
    } = this.props;
    return (
      <div className="player col-xs-12">
        <div className="col-xs-1 col-xs-offset-1 player-controls">
          <i className="material-icons">pause</i>
        </div>
        <div className="col-xs-9 col-xs-offset-1 player-details">
          <div className="player-title">{name}</div>
          <div className="player-album">
            <span>{artist}</span> - <span>{album}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;