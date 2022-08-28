import {
  Box,
  Title,
  Text,
  Group,
  Image,
  Stack,
  Button,
  createStyles,
} from '@mantine/core'
import useSWR from 'swr'
import { ITrack } from 'types'
import { msToTime } from 'utils'
import { spotiFetcher } from 'lib/spotify'
import { topTracksEP } from 'endpoints'
import Loader from './Loader'

const useStyles = createStyles(() => ({
  trackContainer: {
    cursor: 'pointer',
    img: {
      transition: 'filter 0.3s ease',
    },
    '& .trackDetails, & .trackTime': {
      transition: 'all 0.3s ease',
    },
    justifyContent: 'space-between',
    '&:hover': {
      '& .trackDetails, & .trackTime': {
        opacity: 0.7,
        transform: 'translateX(1px)',
      },
      img: {
        filter: 'brightness(0.6)',
      },
    },
  },
}))

export default function TopTracksList({
  accessToken,
}: {
  accessToken: string
}) {
  const { classes } = useStyles()
  const { data: topTracks } = useSWR(
    [topTracksEP({ limit: 20 }), accessToken],
    spotiFetcher,
  )
  const { items: tracks } = topTracks || {}

  return (
    <Box mb="md">
      <Group mb="md" style={{ justifyContent: 'space-between' }}>
        <Title order={2}>Top Tracks of All Time</Title>
        <Button radius="xl" variant="default">
          See more
        </Button>
      </Group>
      {tracks ? (
        <Stack>
          {tracks.map((track: ITrack) => {
            const { name, id, album, artists, duration_ms: duration } = track
            const { name: albumName, images } = album
            const img = images[0]?.url || 'https://picsum.photos/200'
            const artistNames = artists.map((artist) => artist.name)

            return (
              <Group key={id} noWrap className={classes.trackContainer}>
                <Group noWrap>
                  <Image
                    src={img}
                    width={80}
                    height={80}
                    radius="lg"
                    alt="Artist Image"
                  />
                  <Stack spacing={0} className="trackDetails">
                    <Text weight={500} lineClamp={1}>
                      {name}
                    </Text>
                    <Text size="sm" lineClamp={2}>
                      {artistNames.join(', ')}
                    </Text>
                    <Text size="xs" lineClamp={1}>
                      {albumName}
                    </Text>
                  </Stack>
                </Group>
                <Text size="sm" className="trackTime">
                  {msToTime(duration)}
                </Text>
              </Group>
            )
          })}
        </Stack>
      ) : (
        <Box py="md">
          <Loader />
        </Box>
      )}
    </Box>
  )
}
