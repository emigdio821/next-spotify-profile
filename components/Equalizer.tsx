import { Box, Group, createStyles } from '@mantine/core'
import styles from 'styles/equalizer.module.css'

const useStyles = createStyles((theme) => ({
  eqBar: {
    height: '0.5rem',
    width: '0.1875rem',
    backgroundColor: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}))

function EQBar({ className }: { className: string }) {
  const { classes, cx } = useStyles()

  return <Box className={cx(className, classes.eqBar)} />
}

export default function Equalizer() {
  return (
    <Group spacing={1} align="flex-end" style={{ height: '20px' }}>
      {Array.from(Array(6), (_, i) => i).map((i) => (
        <EQBar key={i} className={styles[`bar-${i + 1}`]} />
      ))}
    </Group>
  )
}
