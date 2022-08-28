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
import { topArtistsEP } from 'endpoints'
import { spotiFetcher } from 'lib/spotify'
import AppWrapper from 'components/AppWrapper'
import { ITerm, IArtist, ISession } from 'types'
import { getSession, GetSessionParams } from 'next-auth/react'
import Loader from 'components/Loader'

const useStyles = createStyles((theme) => ({
  groupContainer: {
    marginBottom: theme.spacing.xl,
    justifyContent: 'space-between',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  artistStack: {
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    [theme.fn.smallerThan('xs')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    },
  },
}))

export default function TopArtists({ session }: { session: ISession }) {
  const [term, setTerm] = useState<ITerm>()
  const { classes } = useStyles()
  const { accessToken } = session
  const { data: topArtists } = useSWR(
    [topArtistsEP({ term }), accessToken],
    spotiFetcher,
  )
  const { items: artists } = topArtists || {}

  const handleTerm = (val: string) => {
    if (val === term) return
    setTerm(val as ITerm)
  }

  return (
    <>
      <Helmet title="Top Artists" />
      <AppWrapper>
        <>
          <Group align="center" className={classes.groupContainer}>
            <Title>Top Artists</Title>
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
            {artists ? (
              <>
                {artists.map((artist: IArtist) => {
                  const { id, images, name } = artist
                  const imgSrc = images[0].url || ''

                  return (
                    <Stack
                      key={id}
                      align="center"
                      className={classes.artistStack}
                    >
                      <Image
                        width={164}
                        radius={100}
                        src={imgSrc}
                        height={164}
                        alt="Artist Image"
                      />
                      <Text weight={500}>{name}</Text>
                    </Stack>
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
