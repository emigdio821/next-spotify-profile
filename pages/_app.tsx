/* eslint-disable react/jsx-props-no-spreading */
import {
  ColorScheme,
  MantineProvider,
  ColorSchemeProvider,
} from '@mantine/core'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    defaultValue: 'dark',
    key: 'mantine-color-scheme',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <SessionProvider session={pageProps.session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: 'dark',
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  )
}
