import useSWR from 'swr'
import { ITrack } from 'types'
import { spotiFetcher } from 'lib/spotify'
import { topTracksEP } from 'endpoints'
import { Box, Title, Text, Group, Image, Stack, Button } from '@mantine/core'
import Loader from './Loader'

export default function TopTracksList({
  accessToken,
}: {
  accessToken: string
}) {
  const { data: topTracks } = useSWR(
    [topTracksEP(20), accessToken],
    spotiFetcher,
  )
  const { items: tracks } = topTracks || {}

  return (
    <Box mb="md">
      <Group mb="md" style={{ justifyContent: 'space-between' }}>
        <Title order={2}>Your Top Tracks</Title>
        <Button radius="xl" variant="default">
          See more
        </Button>
      </Group>
      {tracks ? (
        <Stack>
          {tracks.map((track: ITrack) => {
            const { name, id, album, artists } = track
            const { name: albumName, images } = album
            const img = images[0]?.url || 'https://picsum.photos/200'
            const artistNames = artists.map((artist) => artist.name)

            return (
              <Group key={id} noWrap>
                <Image
                  src={img}
                  width={80}
                  height={80}
                  radius="lg"
                  alt="Artist Image"
                />
                <Stack spacing={0}>
                  <Text weight={500} lineClamp={1}>
                    {name}
                  </Text>
                  <Stack spacing={0}>
                    <Text size="sm" lineClamp={2}>
                      {artistNames.join(', ')}
                    </Text>
                    <Text size="xs" lineClamp={1}>
                      {albumName}
                    </Text>
                  </Stack>
                </Stack>
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
