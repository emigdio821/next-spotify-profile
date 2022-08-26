import { TablerIcon } from '@tabler/icons'
import { Tooltip, UnstyledButton, createStyles } from '@mantine/core'
import { NextLink } from '@mantine/next'

const useStyles = createStyles((theme) => {
  const isDark = theme.colorScheme === 'dark'

  return {
    link: {
      padding: 10,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.md,
      color: isDark ? theme.colors.dark[2] : theme.colors.dark[4],

      '&:hover': {
        backgroundColor: isDark ? theme.colors.dark[5] : theme.colors.gray[2],
      },
    },

    active: {
      '&, &:hover': {
        color: isDark ? theme.colors.dark[0] : theme.black,
        backgroundColor: isDark ? theme.colors.dark[5] : theme.colors.gray[2],
      },
    },
  }
})

interface NavbarLinkProps {
  label: string
  icon: TablerIcon
  active?: boolean
  pathname?: string
  nextLink?: boolean
}

export default function NavbarLink({
  label,
  active,
  icon: Icon,
  pathname = '/',
  nextLink = true,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  return (
    <Tooltip label={label} position="right">
      {nextLink ? (
        <UnstyledButton
          href={pathname}
          component={NextLink}
          className={cx(classes.link, { [classes.active]: active })}
        >
          <Icon stroke={1.5} />
        </UnstyledButton>
      ) : (
        <UnstyledButton className={classes.link}>
          <Icon stroke={1.5} />
        </UnstyledButton>
      )}
    </Tooltip>
  )
}
