/* eslint-disable react/jsx-props-no-spreading */
import {
  ColorScheme,
  MantineProvider,
  ColorSchemeProvider,
} from '@mantine/core'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <>
      <Head>
        <title>Spotify Profile</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="description" content="Your Spotify Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
