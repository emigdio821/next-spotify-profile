import Navbar from 'components/Navbar'
import { Container, createStyles } from '@mantine/core'

interface WrapperProps {
  children: JSX.Element
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
}))

export default function AppWrapper({ children }: WrapperProps) {
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <Navbar />
      <Container fluid className={classes.children}>
        {children}
      </Container>
    </div>
  )
}
