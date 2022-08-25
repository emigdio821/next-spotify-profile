import { IconTool } from '@tabler/icons'
import AppWrapper from 'components/AppWrapper'
import { getSession, GetSessionParams } from 'next-auth/react'
import { Text, Title, createStyles, Center, Image } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 32,
    fontWeight: 900,
    textAlign: 'center',
    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
    },
  },

  container: {
    textAlign: 'center',
  },
}))

interface Session {
  user: {
    name: string
    email: string
    image: string
  }
}

export default function Home({ session }: { session: Session }) {
  const { classes } = useStyles()
  const { user } = session || {}

  return (
    <AppWrapper>
      <div className={classes.container}>
        {user && (
          <>
            <Center>
              <Image
                mb={20}
                width={200}
                height={200}
                radius={100}
                alt="Spotify Logo"
                src={user.image || 'https://picsum.photos/200'}
              />
            </Center>
            <Title className={classes.title}>Hi, {user.name}</Title>
            <Text mb={20}>{user.email}</Text>
            <Text size="lg" align="center">
              App is still under construction
            </Text>
            <IconTool stroke={1.5} />
          </>
        )}
      </div>
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
