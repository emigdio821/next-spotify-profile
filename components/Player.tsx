import { createStyles, Text, Stack, Group, Image, Tooltip } from '@mantine/core'
import { INowPlayingTrack } from 'types'
import Equalizer from './Equalizer'

interface IPlayerProps {
  trackItem: INowPlayingTrack | undefined
  refreshData: (opt: boolean) => void
}

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  children: {
    margin: 0,
    padding: 60,
    width: '100%',
    paddingLeft: 60 + 80,
    [theme.fn.smallerThan('sm')]: {
      padding: 20,
      paddingLeft: 20,
      paddingBottom: 20 + 80,
    },
  },

  playingContainer: {
    right: 20,
    bottom: 20,
    maxWidth: 400,
    borderRadius: 16,
    background:
      theme.colorScheme === 'dark'
        ? 'rgba(17, 17, 19, 0.9)'
        : 'rgba(233, 236, 239, 0.9)',
    backdropFilter: 'blur(12px)',
    position: 'fixed',
    alignContent: 'center',
    [theme.fn.smallerThan('sm')]: {
      bottom: 80,
      width: '100%',
      right: 'unset',
      borderRadius: 'unset',
    },
  },

  trackImg: {
    cursor: 'pointer',
  },

  trackStack: {
    maxWidth: 284,
    [theme.fn.smallerThan('sm')]: {
      maxWidth: 260,
    },
  },
}))

export default function Player({ trackItem, refreshData }: IPlayerProps) {
  const { classes } = useStyles()
  const { item: track } = trackItem || {}
  const { album, name, artists } = track || {}
  const img = album?.images[0]?.url || 'https://picsum.photos/200'
  const artistNames = artists?.map((artist) => artist.name)

  return (
    <Group className={classes.playingContainer} p="sm" spacing={12}>
      <Tooltip label="Click to refresh">
        <Image
          src={img}
          width={80}
          radius="lg"
          height={80}
          alt="Track Image"
          className={classes.trackImg}
          onClick={() => refreshData(true)}
        />
      </Tooltip>
      <Stack spacing={0} className={classes.trackStack}>
        {trackItem && <Equalizer />}
        <Text weight={500} lineClamp={1}>
          {name || 'Spotify'}
        </Text>
        <Text size="sm" lineClamp={2}>
          {artistNames?.join(', ') || 'No song playing'}
        </Text>
      </Stack>
    </Group>
  )
}
