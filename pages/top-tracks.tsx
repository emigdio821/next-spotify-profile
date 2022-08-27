import { Title } from '@mantine/core'
import Helmet from 'components/Helmet'
import AppWrapper from 'components/AppWrapper'

export default function TopTracks() {
  return (
    <>
      <Helmet title="Top Tracks" />
      <AppWrapper>
        <Title>Top Tracks</Title>
      </AppWrapper>
    </>
  )
}
