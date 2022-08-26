import { useCallback, useEffect, useState } from 'react'
import { getUserInfo } from 'lib/spotify'

interface IUSerInfo {
  country: string
  display_name: string
  email: string
  followers: { href: string; total: number }
  href: string
  id: string
  product: string
  type: string
  uri: string
}

export default function useFollowers() {
  const [data, setData] = useState<IUSerInfo>()

  const getUserInfoData = useCallback(async () => {
    const response = await getUserInfo()
    const res = await response.json()
    setData(res)
  }, [])

  useEffect(() => {
    getUserInfoData()
  }, [getUserInfoData])

  return data
}
