import {
  Card,
  Text,
  Stack,
  Image,
  Center,
  Button,
  createStyles,
} from '@mantine/core'
import { ISession } from 'types'
import Helmet from 'components/Helmet'
import { NextLink } from '@mantine/next'
import { signIn, getSession, GetSessionParams } from 'next-auth/react'

const useStyles = createStyles((theme) => ({
  card: {
    width: 400,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
}))

export default function Login({ session }: { session: ISession }) {
  const { classes } = useStyles()
  const { user } = session || {}

  return (
    <Center>
      <Helmet title="Login" />
      <Card withBorder p="xl" radius="md" m="lg" className={classes.card}>
        <Center>
          <Stack align="center" spacing={10}>
            <Image
              mb={20}
              width={52}
              height={52}
              alt="Spotify Logo"
              src="/spotify-logo.svg"
            />
            {user ? (
              <>
                <Text>
                  Logged in as <b>{user.name}</b>
                </Text>
                <Button
                  href="/"
                  radius="xl"
                  variant="default"
                  component={NextLink}
                >
                  Home
                </Button>
              </>
            ) : (
              <Button
                radius="xl"
                variant="default"
                onClick={() =>
                  signIn('spotify', {
                    callbackUrl: '/',
                  })
                }
              >
                Log in with Spotify
              </Button>
            )}
          </Stack>
        </Center>
      </Card>
    </Center>
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
