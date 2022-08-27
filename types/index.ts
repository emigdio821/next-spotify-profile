export interface ISession {
  accessToken: string
  refreshToken: string
  username: string
  user: {
    name: string
    email: string
    image: string
  }
}

export interface IArtist {
  images: {
    url: string
    width: number
    height: number
  }[]
  id: string
  uri: string
  name: string
  type: string
  href: string
  genres: string[]
  popularity: number
  followers: { href: string | null; total: number }
}

export interface ITrack {
  name: string
  id: string
  duration_ms: number
  artists: {
    id: string
    name: string
  }[]
  album: {
    name: string
    images: {
      url: string
      width: number
      height: number
    }[]
    artists: {
      id: string
      name: string
    }[]
  }
}

export interface ITrackData {
  items: ITrack[]
}

export interface IArtistData {
  items: IArtist[]
  href: string
  limit: number
  total: number
  offset: number
  next: string | null
  previous: string | null
}
