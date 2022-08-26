import { IArtistData } from 'types'
import { getTopArtists } from 'lib/spotify'
import { useCallback, useEffect, useState } from 'react'

export default function useGetTopArtists() {
  const [data, setData] = useState<IArtistData>()

  const getTopArtistsData = useCallback(async () => {
    const response = await getTopArtists()
    const res = await response.json()
    setData(res)
  }, [])

  useEffect(() => {
    getTopArtistsData()
  }, [getTopArtistsData])

  return data
}
