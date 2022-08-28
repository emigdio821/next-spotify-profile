import {
  Box,
  Tabs,
  Text,
  Stack,
  Title,
  Image,
  Group,
  createStyles,
} from '@mantine/core'
import useSWR from 'swr'
import { useState } from 'react'
import Helmet from 'components/Helmet'
import { topTracksEP } from 'endpoints'
import { spotiFetcher } from 'lib/spotify'
import AppWrapper from 'components/AppWrapper'
import { ITerm, ITrack, ISession } from 'types'
import { getSession, GetSessionParams } from 'next-auth/react'
import Loader from 'components/Loader'
import { msToTime } from 'utils'

const useStyles = createStyles((theme) => ({
  groupContainer: {
    marginBottom: theme.spacing.xl,
    justifyContent: 'space-between',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  tracksStack: {
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    img: {
      transition: 'filter 0.3s ease',
    },
    '&:hover': {
      img: {
        filter: 'brightness(0.6)',
      },
      transform: 'translateY(-2px)',
    },
  },

  gridBox: {
    gap: 20,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    [theme.fn.smallerThan('xs')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    },
  },
}))

export default function TopTracks({ session }: { session: ISession }) {
  const [term, setTerm] = useState<ITerm>()
  const { classes } = useStyles()
  const { accessToken } = session
  const { data: topTracks } = useSWR(
    [topTracksEP({ term }), accessToken],
    spotiFetcher,
  )
  const { items: tracks } = topTracks || {}

  const handleTerm = (val: string) => {
    if (val === term) return
    setTerm(val as ITerm)
  }

  return (
    <>
      <Helmet title="Top Tracks" />
      <AppWrapper>
        <>
          <Group align="center" className={classes.groupContainer}>
            <Title>Top Tracks</Title>
            <Tabs
              color="gray"
              variant="pills"
              defaultValue="long_term"
              onTabChange={(val: string) => handleTerm(val)}
            >
              <Tabs.List>
                <Tabs.Tab value="long_term">All Time</Tabs.Tab>
                <Tabs.Tab value="medium_term">Last 6 Months</Tabs.Tab>
                <Tabs.Tab value="short_term">Last Month</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Group>
          <Box className={classes.gridBox}>
            {tracks ? (
              <>
                {tracks.map((track: ITrack) => {
                  const {
                    name,
                    id,
                    album,
                    artists,
                    duration_ms: duration,
                  } = track
                  const { name: albumName, images } = album
                  const img = images[0]?.url || 'https://picsum.photos/200'
                  const artistNames = artists.map((artist) => artist.name)

                  return (
                    <Group noWrap key={id} className={classes.tracksStack}>
                      <Image
                        src={img}
                        width={164}
                        height={164}
                        radius={100}
                        alt="Track Image"
                      />
                      <Stack spacing={0} className="trackDetails">
                        <Text weight={500} lineClamp={1} size="lg">
                          {name}
                        </Text>
                        <Text size="sm" lineClamp={2}>
                          {artistNames.join(', ')}
                        </Text>
                        <Text size="xs" lineClamp={1}>
                          {albumName}
                        </Text>
                        <Text size="sm">{msToTime(duration)}</Text>
                      </Stack>
                    </Group>
                  )
                })}
              </>
            ) : (
              <Loader />
            )}
          </Box>
        </>
      </AppWrapper>
    </>
  )
}

export async function getServerSideProps(ctx: GetSessionParams) {
  const session = await getSession(ctx)

  return {
    props: {
      session,
    },
  }
}
