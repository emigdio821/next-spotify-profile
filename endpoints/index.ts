import { ILimitTermEP } from 'types'

export const nowPlayingEP =
  'https://api.spotify.com/v1/me/player/currently-playing'
export const recentlyPlayedEP =
  'https://api.spotify.com/v1/me/player/recently-played'
export const tokenEP = 'https://accounts.spotify.com/api/token'
export const followersEP =
  'https://api.spotify.com/v1/me/following?type=artist&limit=50'
export const playlistsEP = 'https://api.spotify.com/v1/me/playlists?limit=50'
export const userInfoEP = 'https://api.spotify.com/v1/me'

export const topArtistsEP = ({
  limit = 50,
  term = 'long_term',
}: ILimitTermEP) =>
  `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${term}`

export const topTracksEP = ({ limit = 50, term = 'long_term' }: ILimitTermEP) =>
  `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${term}`
