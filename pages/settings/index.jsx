import { getSnapshot } from 'mobx-state-tree'
import { prefetchPage } from '@/modules/app/utils/prefetchPage.js'
import { getTrafficCourtsUsecase } from '@/modules/traffic-court/core/usecases/get-traffic-courts.usecase.js'
import { getTrafficStatesUsecase } from '@/modules/traffic-state/core/usecases/get-traffic-states.usecase.js'
import { getTrafficCountiesUsecase } from '@/modules/traffic-county/core/usecases/get-traffic-counties.usecase.js'
import { getViolationsUsecase } from '@/modules/violation/core/usecases/get-violations.usecase.js'
import TrafficCourt from '@/modules/traffic-court/ui/TrafficCourt.jsx'
import TrafficCounty from '@/modules/traffic-county/ui/TrafficCounty.jsx'
import { Divider } from '@mui/material'
import Violation from '@/modules/violation/ui/Violation.jsx'
import TrafficState from '@/modules/traffic-state/ui/TrafficState.jsx'

export default function Page() {
  return (
    <>
      <TrafficCourt />
      <Divider sx={{ my: 4 }} />
      <TrafficCounty />
      <Divider sx={{ my: 4 }} />
      <Violation />
      <Divider sx={{ my: 4 }} />
      <TrafficState />
    </>
  )
}
export async function getServerSideProps(ctx) {
  const store = await prefetchPage(ctx)
  try {
    await getTrafficCourtsUsecase()(store)
    await getTrafficStatesUsecase()(store)
    await getTrafficCountiesUsecase()(store)
    await getViolationsUsecase()(store)
  } catch (error) {
    console.error(error)
  }
  return {
    props: { initialState: getSnapshot(store) },
  }
}
