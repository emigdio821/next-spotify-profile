import { useCallback, useEffect, useState } from 'react'
import { getFollowers } from 'lib/spotify'

interface IFollowedArtists {
  artists: {
    items: []
    href: string
    next: string
    limit: number
    total: number
  }
}

export default function useFollowers() {
  const [data, setData] = useState<IFollowedArtists>()

  const getFollowersData = useCallback(async () => {
    const response = await getFollowers()
    const res = await response.json()
    setData(res)
  }, [])

  useEffect(() => {
    getFollowersData()
  }, [getFollowersData])

  return data
}
