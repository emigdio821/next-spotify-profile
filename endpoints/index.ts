import { ITopArtistsEP } from 'types'

export const nowPlayingEP =
  'https://api.spotify.com/v1/me/player/currently-playing'
export const recentlyPlayedEP =
  'https://api.spotify.com/v1/me/player/recently-played?limit=1'
export const tokenEP = 'https://accounts.spotify.com/api/token'
export const followersEP =
  'https://api.spotify.com/v1/me/following?type=artist&limit=50'
export const playlistsEP = 'https://api.spotify.com/v1/me/playlists'
export const userInfoEP = 'https://api.spotify.com/v1/me'

export const topArtistsEP = ({
  limit = 50,
  term = 'long_term',
}: ITopArtistsEP) =>
  `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${term}`

export const topTracksEP = (limit = 50) =>
  `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=long_term`