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
import { playlistsEP } from 'endpoints'
import { spotiFetcher } from 'lib/spotify'
import { IPlaylist, ISession } from 'types'
import AppWrapper from 'components/AppWrapper'
import { getSession, GetSessionParams } from 'next-auth/react'
import Loader from 'components/Loader'

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

export default function Playlists({ session }: { session: ISession }) {
  const { classes } = useStyles()
  const { accessToken } = session
  const { data: playlistsData } = useSWR(
    [playlistsEP, accessToken],
    spotiFetcher,
  )
  const { items: playlists } = playlistsData || {}

  return (
    <>
      <Helmet title="Playlists" />
      <AppWrapper>
        <>
          <Title mb="xl">Playlists</Title>
          <Box className={classes.gridBox}>
            {playlists ? (
              <>
                {playlists.map((playlist: IPlaylist) => {
                  const {
                    id,
                    name,
                    tracks,
                    images,
                    collaborative: isColab,
                  } = playlist
                  const img = images[0]?.url || 'https://picsum.photos/200'

                  return (
                    <Group noWrap key={id} className={classes.tracksStack}>
                      <Image
                        src={img}
                        radius="lg"
                        width={164}
                        height={164}
                        alt="Playlist Image"
                      />
                      <Stack spacing={0} className="trackDetails">
                        <Text weight={500} lineClamp={1} size="lg">
                          {name}
                        </Text>
                        {isColab && <Text lineClamp={2}>Collaborative</Text>}
                        <Text lineClamp={1}>{tracks.total} Tracks</Text>
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
