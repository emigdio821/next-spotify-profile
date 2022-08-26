import { useCallback, useEffect, useState } from 'react'
import { getPlaylists } from 'lib/spotify'

interface IPlaylists {
  href: string
  items: []
  limit: number
  next: string
  offset: number
  previous: string | null
  total: number
}

export default function useFollowers() {
  const [data, setData] = useState<IPlaylists>()

  const getPlaylistsData = useCallback(async () => {
    const response = await getPlaylists()
    const res = await response.json()
    setData(res)
  }, [])

  useEffect(() => {
    getPlaylistsData()
  }, [getPlaylistsData])

  return data
}
