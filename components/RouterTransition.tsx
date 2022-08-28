// components/RouterTransition.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NavigationProgress, setNavigationProgress } from '@mantine/nprogress'

export default function RouterTransition() {
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setNavigationProgress(20)
      }
    }
    const handleComplete = () => {
      setNavigationProgress(100)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.asPath, router.events])

  return (
    <NavigationProgress color="green" size={2} autoReset exitTimeout={250} />
  )
}
