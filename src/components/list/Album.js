import React from 'react';

import Api from '../../utils/Api';
import Track from './Track';

class Album extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      isOpen: false,
    };
    this.onClickAlbum = this.onClickAlbum.bind(this);
  }

  async onClickAlbum() {
    if (this.state.isOpen === true) {
      return;
    }
    const tracks = await Api.getSpotifyTracksByAlbumId({
      albumId: this.props.id,
    });
    this.setState({
      tracks,
    });
  }

  renderTracks() {
    if (this.state.tracks.length === 0) {
      return null;
    }

    const tracksList = this.state.tracks.map((track, key) => 
      <Track key={key} albumName={this.props.name} {...track} play={this.props.play} />
    );

    return (
      <div>
        {tracksList}
      </div>
    );
}

  render() {
    const {
      images,
      name,
      artists,
    } = this.props;
    return (
      <div className="row album" onClick={this.onClickAlbum}>
        <div className="col-xs-3 pic">
          <img src={images[0].url} alt="" className="cover img-responsive" />
        </div>
        <div className="col-xs-9 details">
          <p className="title">{name}</p>
          <p className="artist">{artists[0].name}</p>
        </div>
        {this.renderTracks()}
      </div>
    );
  }
}

export default Album;