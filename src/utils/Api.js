import env from '../env.json';

class Api {

  set accessToken(accessToken) {
    this._accessToken = accessToken;
  }

  get accessToken() {
    return this._accessToken;
  }

  async getSpotifyTracksByAlbumId({
    albumId,
  }) {
    const url = `https://api.spotify.com/v1/albums/${albumId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
    });
    const json = await response.json();
    return json.tracks.items;
  }

  async login(callback) {
    var CLIENT_ID = env.spotify.clientId;
    var REDIRECT_URI = env.spotify.redirectUri;
    function getLoginURL(scopes) {
        return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
          '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
          '&scope=' + encodeURIComponent(scopes.join(' ')) +
          '&response_type=token';
    }
    
    var url = getLoginURL([
        'user-read-email'
    ]);
    
    var width = 450,
        height = 730,
        left = (screen.width / 2) - (width / 2), // eslint-disable-line no-restricted-globals
        top = (screen.height / 2) - (height / 2); // eslint-disable-line no-restricted-globals

    window.addEventListener("message", (event) => {
        var hash = JSON.parse(event.data);
        if (hash.type === 'access_token') {
            this.accessToken = hash.access_token;
            callback(null, true);
        }
    }, false);
    
    window.open(url,
      'Spotify',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
    );
        
  }

  async searchSpotifyAlbums({
    query,
  }) {
    const url = `https://api.spotify.com/v1/search/?type=album&q=${query}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
    });
    const json = await response.json();

    console.log('Api#searchSpotify json', json);

    return json.albums.items;
  }
}

export default new Api();