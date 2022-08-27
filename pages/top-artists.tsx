import { Title } from '@mantine/core'
import Helmet from 'components/Helmet'
import AppWrapper from 'components/AppWrapper'

export default function TopArtists() {
  return (
    <>
      <Helmet title="Top Artists" />
      <AppWrapper>
        <Title>Top Artists</Title>
      </AppWrapper>
    </>
  )
}
