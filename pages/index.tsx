import {
  Text,
  Loader,
  Title,
  Center,
  Container,
  createStyles,
} from '@mantine/core'
import ThemeSwitcher from 'components/ThemeSwitcher'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))

export default function NotFoundTitle() {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <Center mb="lg">
        <Loader />
      </Center>
      <ThemeSwitcher />
      <Title className={classes.title}>Hi there</Title>
      <Text
        size="lg"
        color="dimmed"
        align="center"
        className={classes.description}
      >
        This page is under construction
      </Text>
    </Container>
  )
}
