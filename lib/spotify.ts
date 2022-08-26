import {
  ME_EP,
  TOKEN_EP,
  FOLLOWERS_EP,
  PLAYLISTS_EP,
  TOP_TRACKS_EP,
  TOP_ARTISTS_EP,
  NOW_PLAYING_EP,
  RECENTLY_PLAYED_EP,
} from '../constants'

const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN as string
const clientId = process.env.SPOTIFY_CLIENT_ID as string
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string

const encodeStr = btoa(`${clientId}:${clientSecret}`)

const getAccessToken = async () => {
  const response = await fetch(TOKEN_EP, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodeStr}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  return response.json()
}

export const getNowPlaying = async () => {
  const { access_token: accessToken } = await getAccessToken()

  return fetch(NOW_PLAYING_EP, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getFollowers = async () => {
  const { access_token: accessToken } = await getAccessToken()

  return fetch(FOLLOWERS_EP, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getPlaylists = async () => {
  const { access_token: accessToken } = await getAccessToken()

  return fetch(PLAYLISTS_EP, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getUserInfo = async () => {
  const { access_token: accessToken } = await getAccessToken()

  return fetch(ME_EP, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getTopArtists = async () => {
  const { access_token: accessToken } = await getAccessToken()

  return fetch(TOP_ARTISTS_EP, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getTopTracks = async () => {
  const { access_token: accessToken } = await getAccessToken()

  return fetch(TOP_TRACKS_EP, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getRecentlyPlayed = async () => {
  const { access_token: accessToken } = await getAccessToken()

  return fetch(RECENTLY_PLAYED_EP, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
