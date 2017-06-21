import React from 'react';

import Api from './utils/Api';
import AlbumItem from './components/list/Album';
import Player from './components/Player';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      albums: [],
      searchText: '',
      track: {},
      isPlaying: false,
    };

    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onKeyPressSearch = this.onKeyPressSearch.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.play = this.play.bind(this);
    this.audioPlayer = new Audio();
  }

  componentDidMount() {
    this.login();
  }

  onChangeSearchText(e) {
    const searchText = e.target.value;
    this.setState({
      searchText,
    });
  }

  onClickLogin() {
    console.log('>> App#onClickLogin');
    this.login();  
  }


  onClickSearch(e) {
    this.search();
  }

  onKeyPressSearch(e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  login() {
    Api.login((err, isLoggedIn) => {
      console.log('App#onClickLogin loggedIn isLoggedIn', isLoggedIn);
      if (isLoggedIn === true) {
        this.setState({
          isLoggedIn,
        });
      }
    });
  }

  play({
    track
  } = {}) {
    // console.log('App#play track', track);
    this.audioPlayer.pause();
    this.audioPlayer.src = track.url;
    this.audioPlayer.play();
    this.setState({
      isPlaying: true,
      track,
    });
  }

  renderAlbumList() {
    if (this.state.albums.length === 0) {
      return null;
    }
    return this.state.albums.map((album, key) => <AlbumItem key={key} {...album} play={this.play} />);
  }

  renderBody() {
    const {
      searchText,
      isLoggedIn,
    } = this.state;

    if (isLoggedIn === false) {
      return (
        <div className="col-xs-10 col-xs-offset-1">
          <p>To use the player, login with your Spotify account</p>
          <button className="btn btn-default" onClick={this.onClickLogin}>Login</button>
        </div>
      );
    }

    return (
      <div className="input-group col-xs-10 col-xs-offset-1">
        <input id="text" value={searchText} onKeyPress={this.onKeyPressSearch} onChange={this.onChangeSearchText} className="form-control" placeholder="Album..." />
        <span className="input-group-btn">
          <button id="search" type="button" className="btn btn-default" onClick={this.onClickSearch}>
            Search
          </button>
        </span>
      </div>
    );
  }

  renderPlayer() {
    if (this.state.isPlaying === false) {
      return null;
    }

    const {
      track,
    } = this.state;

    return <Player {...track} />;
  }

  async search() {
    const query = this.state.searchText;
    const albums = await Api.searchSpotifyAlbums({
      query,
    });
    this.setState({
      albums,
    });
  }

  render() {
    return (
      <div>
        <h1>Spotify</h1>
        {this.renderBody()}
        {this.renderAlbumList()}
        {this.renderPlayer()}
      </div>
    );
  }
}

export default App;
