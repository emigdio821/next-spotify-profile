import { ITrackData } from 'types'
import { getTopTracks } from 'lib/spotify'
import { useCallback, useEffect, useState } from 'react'

export default function useGetTopArtists() {
  const [data, setData] = useState<ITrackData>()

  const getTopTracksData = useCallback(async () => {
    const response = await getTopTracks()
    const res = await response.json()
    setData(res)
  }, [])

  useEffect(() => {
    getTopTracksData()
  }, [getTopTracksData])

  return data
}
