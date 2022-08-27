import {
  Box,
  Text,
  Group,
  Title,
  Stack,
  Image,
  Button,
  Center,
  createStyles,
} from '@mantine/core'
import { ISession } from 'types'
import Loader from 'components/Loader'
import AppWrapper from 'components/AppWrapper'
import TopArtists from 'components/TopArtists'
import { useFollowers, usePlaylists, useUserInfo } from 'hooks'
import { IconLogout, IconBolt, IconBoltOff } from '@tabler/icons'
import { signOut, getSession, GetSessionParams } from 'next-auth/react'
import TopTracks from 'components/TopTracks'

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    textAlign: 'center',
    [theme.fn.smallerThan('sm')]: {
      fontSize: 30,
    },
  },

  container: {
    textAlign: 'center',
  },

  signOutIcon: {
    transform: 'rotate(180deg)',
  },

  userInfoTitle: {
    opacity: 0.9,
    letterSpacing: 1,
  },

  midContainer: {
    gap: 80,
    width: '100%',
    maxWidth: 1400,
    display: 'grid',
    margin: '80px auto 0 auto',
    gridTemplateColumns: '1fr 1fr',
    [theme.fn.smallerThan('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}))

interface UserInfoItemProps {
  title: string
  subtitle: string | undefined
}

function UserInfoItem({ title, subtitle }: UserInfoItemProps) {
  const { classes } = useStyles()

  return (
    <Stack spacing={0}>
      {!subtitle ? (
        <Center m={12}>
          <Loader />
        </Center>
      ) : (
        <Title color="green" order={3}>
          {subtitle}
        </Title>
      )}
      <Text size="sm" transform="uppercase" className={classes.userInfoTitle}>
        {title}
      </Text>
    </Stack>
  )
}

export default function Home({ session }: { session: ISession }) {
  const { classes } = useStyles()
  const { user } = session || {}
  // const nowPlaying = useNowPlaying()
  const following = useFollowers()
  const playlists = usePlaylists()
  const userInfo = useUserInfo()
  // const topArtists = useGetTopArtists()
  const isPremium = userInfo?.product === 'premium'
  // console.log(following)
  // console.log(playlists)
  // console.log(nowPlaying)
  // console.log(userInfo)
  // console.log(topArtists)

  return (
    <AppWrapper>
      <>
        <Box className={classes.container}>
          {user && (
            <>
              <Box mb={10}>
                <Center>
                  <Image
                    mb={10}
                    width={160}
                    height={160}
                    radius={100}
                    alt="Spotify Logo"
                    src={user.image || 'https://picsum.photos/200'}
                  />
                </Center>
                <Title mb={2} className={classes.title}>
                  {user.name}
                </Title>
                <Center>
                  {!userInfo ? (
                    <Box>
                      <Loader />
                    </Box>
                  ) : (
                    <Group spacing={2} align="center">
                      {isPremium ? (
                        <IconBolt stroke={1.5} size={18} />
                      ) : (
                        <IconBoltOff stroke={1.5} size={18} />
                      )}
                      <Text weight={500}>
                        {isPremium ? 'Premium' : 'Free Account'}
                      </Text>
                    </Group>
                  )}
                </Center>
              </Box>
              <Center>
                <Group mb={20} spacing={30} position="center">
                  <UserInfoItem
                    title="Followers"
                    subtitle={userInfo?.followers?.total.toString()}
                  />
                  <UserInfoItem
                    title="Following"
                    subtitle={following?.artists?.total.toString()}
                  />
                  <UserInfoItem
                    title="Playlists"
                    subtitle={playlists?.total.toString()}
                  />
                </Group>
              </Center>
              <Button
                radius="xl"
                variant="default"
                onClick={() => signOut()}
                leftIcon={
                  <IconLogout size={18} className={classes.signOutIcon} />
                }
              >
                Log out
              </Button>
            </>
          )}
        </Box>
        <Box className={classes.midContainer}>
          <TopArtists />
          <TopTracks />
        </Box>
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
