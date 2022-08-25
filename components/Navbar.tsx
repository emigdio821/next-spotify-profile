import { Stack, Image, Navbar, Center, createStyles } from '@mantine/core'
import {
  IconUser,
  IconMusic,
  IconHistory,
  IconPlaylist,
  // IconLogout,
  IconBrandGithub,
  IconMicrophone2,
} from '@tabler/icons'
import { useState } from 'react'
import NavbarLink from './NavbarLink'

const useStyles = createStyles((theme) => ({
  navbar: {
    width: '80px',
    display: 'flex',
    position: 'fixed',
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
    }`,
    justifyContent: 'space-between',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'row',
      height: '80px',
      width: '100%',
      borderRight: 'none',
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[1]
      }`,
    },
  },

  stack: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'row',
    },
  },
}))

const linkBtns = [
  { icon: IconUser, label: 'Profile' },
  { icon: IconMicrophone2, label: 'Top Artists' },
  { icon: IconMusic, label: 'Top Tracks' },
  { icon: IconHistory, label: 'Recent' },
  { icon: IconPlaylist, label: 'Playlists' },
]

export default function MantineNavbar() {
  const { classes } = useStyles()
  const [active, setActive] = useState(2)

  const links = linkBtns.map((link, index) => (
    <NavbarLink
      key={link.label}
      active={index === active}
      icon={link.icon}
      label={link.label}
      onClick={() => setActive(index)}
    />
  ))

  return (
    <Navbar p="md" className={classes.navbar}>
      <Center>
        <Image
          width={36}
          height={36}
          alt="Spotify Logo"
          src="/spotify-logo.svg"
        />
      </Center>
      <Navbar.Section>
        <Stack justify="center" spacing={10} className={classes.stack}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/emigdio821/next-spotify-profile"
        >
          <NavbarLink icon={IconBrandGithub} label="Source" />
        </a>
      </Navbar.Section>
    </Navbar>
  )
}
