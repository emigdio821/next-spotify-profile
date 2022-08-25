import Navbar from 'components/Navbar'
import { Container, createStyles } from '@mantine/core'

interface WrapperProps {
  children: JSX.Element
}

const useStyles = createStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'space-between',
  },

  children: {
    padding: theme.spacing.lg,
    paddingLeft: theme.spacing.lg + 80,
    [theme.fn.smallerThan('sm')]: {
      paddingLeft: theme.spacing.lg,
    },
  },
}))

export default function AppWrapper({ children }: WrapperProps) {
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <Navbar />
      <Container className={classes.children}>{children}</Container>
    </div>
  )
}
