import { Stack, Image, Navbar, Center, createStyles } from '@mantine/core'
import {
  IconUser,
  IconMusic,
  IconHistory,
  IconPlaylist,
  IconBrandGithub,
  IconMicrophone2,
} from '@tabler/icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import NavbarLink from './NavbarLink'

const useStyles = createStyles((theme) => {
  const isDark = theme.colorScheme === 'dark'

  return {
    navbar: {
      width: '80px',
      display: 'flex',
      position: 'fixed',
      backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
      borderRight: `1px solid ${
        isDark ? theme.colors.dark[6] : theme.colors.gray[1]
      }`,
      justifyContent: 'space-between',
      [theme.fn.smallerThan('sm')]: {
        flexDirection: 'row',
        height: '80px',
        width: '100%',
        borderRight: 'none',
        borderTop: `1px solid ${
          isDark ? theme.colors.dark[6] : theme.colors.gray[1]
        }`,
      },
    },

    stack: {
      [theme.fn.smallerThan('sm')]: {
        flexDirection: 'row',
      },
    },

    spotiLogo: {
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-1px)',
      },
    },
  }
})

const linkBtns = [
  { icon: IconUser, label: 'Profile', pathname: '/' },
  { icon: IconMicrophone2, label: 'Top Artists', pathname: '/top-artists' },
  { icon: IconMusic, label: 'Top Tracks', pathname: '/top-tracks' },
  { icon: IconHistory, label: 'Recent Activity', pathname: '/recent' },
  { icon: IconPlaylist, label: 'Playlists', pathname: '/playlists' },
]

export default function MantineNavbar() {
  const { classes } = useStyles()
  const router = useRouter()

  return (
    <Navbar p="md" className={classes.navbar}>
      <Center>
        <NextLink href="/" passHref>
          <Image
            width={36}
            height={36}
            alt="Spotify Logo"
            src="/spotify-logo.svg"
            className={classes.spotiLogo}
          />
        </NextLink>
      </Center>
      <Navbar.Section>
        <Stack justify="center" spacing={10} className={classes.stack}>
          {linkBtns.map((link) => (
            <NavbarLink
              key={link.label}
              icon={link.icon}
              label={link.label}
              pathname={link.pathname}
              active={router.pathname === link.pathname}
            />
          ))}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/emigdio821/next-spotify-profile"
        >
          <NavbarLink nextLink={false} label="Source" icon={IconBrandGithub} />
        </a>
      </Navbar.Section>
    </Navbar>
  )
}
