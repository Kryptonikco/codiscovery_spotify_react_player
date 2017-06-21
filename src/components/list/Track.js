import React from 'react';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.onClickTrack = this.onClickTrack.bind(this);
  }

  onClickTrack() {
    const track = {
      artist: this.props.artists[0].name,
      url: this.props.preview_url,
      name: this.props.name,
      album: this.props.albumName,
    };
    this.props.play({
      track,
    });
  }

  render() {
    const {
      name,
      artists,
    } = this.props;
    return (
      <div className="col-xs-12 track-container" onClick={this.onClickTrack}>
        <p className="track">
          <i className="material-icons play-btn">play_arrow</i>
          <span className="title">{name}</span> - <span className="artist">{artists[0].name}</span>
        </p>
      </div>
    );
  }
}

export default Track;