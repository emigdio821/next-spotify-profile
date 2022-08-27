import { Title } from '@mantine/core'
import Helmet from 'components/Helmet'
import AppWrapper from 'components/AppWrapper'

export default function Playlists() {
  return (
    <>
      <Helmet title="Playlists" />
      <AppWrapper>
        <Title>Playlists</Title>
      </AppWrapper>
    </>
  )
}
