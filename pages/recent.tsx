import { Title } from '@mantine/core'
import Helmet from 'components/Helmet'
import AppWrapper from 'components/AppWrapper'

export default function Recent() {
  return (
    <>
      <Helmet title="Recent Activity" />
      <AppWrapper>
        <Title>Recent Activity</Title>
      </AppWrapper>
    </>
  )
}
