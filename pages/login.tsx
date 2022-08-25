import { signIn } from 'next-auth/react'
import { Card, Stack, Image, Center, Button, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  card: {
    width: 400,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
}))

export default function StatsRingCard() {
  const { classes } = useStyles()

  return (
    <Center>
      <Card withBorder p="xl" radius="md" m="lg" className={classes.card}>
        <Center>
          <Stack align="center" spacing={30}>
            <Image
              width={52}
              height={52}
              alt="Spotify Logo"
              src="/spotify-logo.svg"
            />
            <Button
              radius="xl"
              color="dark"
              variant="default"
              onClick={() =>
                signIn('spotify', {
                  callbackUrl: '/',
                })
              }
            >
              Log in with Spotify
            </Button>
          </Stack>
        </Center>
      </Card>
    </Center>
  )
}
