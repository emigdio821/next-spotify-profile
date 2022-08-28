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
import { IArtist } from 'types'
import { topArtistsEP } from 'endpoints'
import { NextLink } from '@mantine/next'
import { spotiFetcher } from 'lib/spotify'
import Loader from './Loader'

const useStyles = createStyles((theme) => ({
  artistContainer: {
    cursor: 'pointer',
    img: {
      transition: 'filter 0.3s ease',
    },
    transition: 'all 0.3s ease',
    '&:hover': {
      opacity: 0.7,
      img: {
        filter: 'brightness(0.8)',
      },
      borderRadius: theme.spacing.lg,
    },
  },
}))

export default function TopArtistsList({
  accessToken,
}: {
  accessToken: string
}) {
  const { classes } = useStyles()
  const { data: topArtists } = useSWR(
    [topArtistsEP({ limit: 20 }), accessToken],
    spotiFetcher,
  )
  const { items: artists } = topArtists || {}

  return (
    <Box>
      <Group mb="md" style={{ justifyContent: 'space-between' }}>
        <Title order={2}>Top Artists</Title>
        <Button
          passHref
          radius="xl"
          variant="default"
          href="/top-artists"
          component={NextLink}
        >
          See more
        </Button>
      </Group>
      {artists ? (
        <Stack>
          {artists.map((artist: IArtist) => {
            const { name, id, images } = artist
            const img = images[0]?.url || 'https://picsum.photos/200'

            return (
              <Group key={id} className={classes.artistContainer}>
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
