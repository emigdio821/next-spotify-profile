import useSWR from 'swr'
import { ISession } from 'types'
import { numberFormat } from 'utils'
import Loader from 'components/Loader'
import Helmet from 'components/Helmet'
import { useRouter } from 'next/router'
import { artistByIdEP } from 'endpoints'
import { spotiFetcher } from 'lib/spotify'
import AppWrapper from 'components/AppWrapper'
import { Image, Stack, Center, Text, Title, Button } from '@mantine/core'
import { getSession, GetSessionParams } from 'next-auth/react'

interface IStatsProps {
  title: string
  stat: string
}

function ArtistStats({ title, stat }: IStatsProps) {
  return (
    <Stack align="center" spacing={0}>
      <Title color="green" order={3}>
        {stat}
      </Title>
      <Text weight={500} style={{ textTransform: 'uppercase' }}>
        {title}
      </Text>
    </Stack>
  )
}

export default function ArtistPage({ session }: { session: ISession }) {
  const router = useRouter()
  const { id } = router.query
  const { accessToken } = session
  const { data: artist } = useSWR(
    [artistByIdEP(id as string), accessToken],
    spotiFetcher,
  )

  return (
    <AppWrapper>
      <>
        <Helmet title={artist?.name || 'Artist Details'} />
        <Center>
          {artist ? (
            <Stack align="center">
              <Image
                radius="lg"
                width={320}
                height={320}
                alt="Artist Image"
                src={artist?.images[0]?.url || 'https://picsum.photos/200'}
              />
              {artist.external_urls?.spotify && (
                <Button
                  radius="xl"
                  component="a"
                  target="_blank"
                  rel="noreferrer"
                  variant="default"
                  href={artist.external_urls.spotify}
                >
                  View in Spotify
                </Button>
              )}
              <Title style={{ fontSize: 42 }}>{artist.name}</Title>
              <Stack>
                <ArtistStats
                  title="Followers"
                  stat={numberFormat(artist.followers.total)}
                />
                <Stack spacing={0} align="center">
                  {artist.genres.map((genre: string) => (
                    <Title
                      order={3}
                      key={genre}
                      color="green"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {genre}
                    </Title>
                  ))}
                  <Text weight={500} style={{ textTransform: 'uppercase' }}>
                    Genres
                  </Text>
                </Stack>
                <ArtistStats
                  title="Popularity"
                  stat={`${artist.popularity}%`}
                />
              </Stack>
            </Stack>
          ) : (
            <Loader />
          )}
        </Center>
      </>
    </AppWrapper>
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
