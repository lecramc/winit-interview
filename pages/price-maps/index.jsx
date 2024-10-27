import { getAttorneyPriceMapsUsecase } from '@/modules/attorney-price-map/core/usecases/get-attorney-price-maps.usecase.js'
import { prefetchPage } from '@/modules/app/utils/prefetchPage.js'
import { getSnapshot } from 'mobx-state-tree'
import PriceMaps from '@/modules/attorney-price-map/ui/PriceMaps.jsx'
import { getTrafficCourtsUsecase } from '@/modules/traffic-court/core/usecases/get-traffic-courts.usecase.js'
import { getViolationsUsecase } from '@/modules/violation/core/usecases/get-violations.usecase.js'
import { getAttorneysUsecase } from '@/modules/attorney/core/usecases/get-attorneys.usecase.js'

export default function Page() {
  return <PriceMaps />
}

export async function getServerSideProps(req) {
  const store = await prefetchPage(req)
  try {
    await getAttorneyPriceMapsUsecase()(store)
    await getTrafficCourtsUsecase()(store)
    await getViolationsUsecase()(store)
    await getAttorneysUsecase()(store)
  } catch (error) {
    console.error(error)
  }
  return {
    props: { initialState: getSnapshot(store) },
  }
}
