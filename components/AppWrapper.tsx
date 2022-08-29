import useSWR from 'swr'
import { ISession } from 'types'
import Navbar from 'components/Navbar'
import { nowPlayingEP } from 'endpoints'
import { spotiFetcher } from 'lib/spotify'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Container, createStyles, Box } from '@mantine/core'
import Player from './Player'

interface WrapperProps {
  children: JSX.Element
}

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  children: {
    margin: 0,
    padding: 60,
    width: '100%',
    paddingLeft: 60 + 80,
    paddingBottom: 20 + 124,
    [theme.fn.smallerThan('sm')]: {
      padding: 20,
      paddingLeft: 20,
      paddingBottom: 20 + 80 + 112,
    },
  },
}))

export default function AppWrapper({ children }: WrapperProps) {
  const { classes } = useStyles()
  const { data: session } = useSession()
  const [shouldFetch, setShouldFetch] = useState<boolean>(true)
  const [data, setData] = useState()
  const { accessToken } = session as unknown as ISession
  const { data: nowPlaying } = useSWR(
    shouldFetch ? [nowPlayingEP, accessToken] : null,
    spotiFetcher,
  )

  useEffect(() => {
    if (nowPlaying && shouldFetch) {
      setData(nowPlaying)
      setShouldFetch(false)
    }
  }, [nowPlaying, shouldFetch])

  return (
    <Box className={classes.container}>
      <Navbar />
      <Container fluid className={classes.children}>
        {children}
      </Container>
      <Player trackItem={data} refreshData={setShouldFetch} />
    </Box>
  )
}
