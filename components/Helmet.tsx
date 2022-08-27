import Head from 'next/head'

interface HelmetProps {
  title?: string
  description?: string
}

export default function Helmet({
  title = 'Spotify Profile',
  description = 'Spotify Profile is just a simple app to display your Spotify details in a cool way',
}: HelmetProps) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, maximum-scale=1.0"
      />
      <meta property="og:image" content="/apple-touch-icon.png" />
    </Head>
  )
}
