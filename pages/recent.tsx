import {
  Box,
  Text,
  Stack,
  Title,
  Image,
  Group,
  createStyles,
} from '@mantine/core'
import useSWR from 'swr'
import Helmet from 'components/Helmet'
import { recentlyPlayedEP } from 'endpoints'
import { spotiFetcher } from 'lib/spotify'
import AppWrapper from 'components/AppWrapper'
import { ITrack, ISession, IRPLayedItem } from 'types'
import { getSession, GetSessionParams } from 'next-auth/react'
import Loader from 'components/Loader'
import { msToTime } from 'utils'

const useStyles = createStyles((theme) => ({
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
  const { classes } = useStyles()
  const { accessToken } = session
  const { data: rPlayed } = useSWR(
    [recentlyPlayedEP, accessToken],
    spotiFetcher,
  )

  const { items: tracks } = rPlayed || {}

  return (
    <>
      <Helmet title="Recently Played" />
      <AppWrapper>
        <>
          <Title mb="xl">Recently Played</Title>
          <Box className={classes.gridBox}>
            {tracks ? (
              <>
                {tracks.map((item: IRPLayedItem) => {
                  const { track, played_at: playedAt } = item
                  const {
                    id,
                    name,
                    album,
                    artists,
                    duration_ms: duration,
                  } = track as ITrack
                  const { name: albumName, images } = album
                  const img = images[0]?.url || 'https://picsum.photos/200'
                  const artistNames = artists.map((artist) => artist.name)

                  return (
                    <Group
                      noWrap
                      key={id + playedAt}
                      className={classes.tracksStack}
                    >
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
