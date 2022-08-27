import useSWR from 'swr'
import { IArtist } from 'types'
import spotiFetcher from 'lib/spotify'
import { topArtistsEP } from 'endpoints'
import { Box, Title, Text, Group, Image, Stack, Button } from '@mantine/core'
import Loader from './Loader'

export default function TopArtists({ accessToken }: { accessToken: string }) {
  const { data: topArtists } = useSWR([topArtistsEP, accessToken], spotiFetcher)
  const { items: artists } = topArtists || {}

  return (
    <Box>
      <Group mb="md" style={{ justifyContent: 'space-between' }}>
        <Title order={2}>Your Top Artists</Title>
        <Button radius="xl" variant="default">
          See more
        </Button>
      </Group>
      {artists ? (
        <Stack>
          {artists.map((artist: IArtist) => {
            const { name, id, images } = artist
            const img = images[0]?.url || 'https://picsum.photos/200'

            return (
              <Group key={id}>
                <Image
                  src={img}
                  width={80}
                  height={80}
                  radius="lg"
                  alt="Artist Image"
                />
                <Text weight={500}>{name}</Text>
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
