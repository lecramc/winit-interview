import AttorneysPanel from '@/modules/attorney/ui/AttorneysPanel.jsx'
import { getSnapshot } from 'mobx-state-tree'
import { prefetchPage } from '@/modules/app/utils/prefetchPage.js'
import { getAttorneysUsecase } from '@/modules/attorney/core/usecases/get-attorneys.usecase.js'
import { getAttorneyPriceMapsUsecase } from '@/modules/attorney-price-map/core/usecases/get-attorney-price-maps.usecase.js'

export const Page = () => {
  return <AttorneysPanel />
}

export default Page

export async function getServerSideProps(req) {
  const store = await prefetchPage(req)
  try {
    await getAttorneysUsecase()(store)
    await getAttorneyPriceMapsUsecase()(store)
  } catch (error) {
    console.error(error)
  }
  return {
    props: { initialState: getSnapshot(store) },
  }
}
