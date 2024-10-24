import AttorneysPanel from '@/modules/attorney/ui/panel/AttorneysPanel.jsx'
import { createStore } from '@/modules/app/stores/AppStore.js'
import { HttpAttorneyGateway } from '@/modules/attorney/core/gateways-infra/http-attorney.gateway.js'
import { getSnapshot } from 'mobx-state-tree'

export const Page = () => <AttorneysPanel />

export default Page

export async function getServerSideProps() {
  const store = createStore({ dependencies: { attorneyGateway: new HttpAttorneyGateway() } })
  try {
    await store.attorney.fetchAttorneys()
  } catch (error) {
    console.error(error)
  }
  return {
    props: { initialState: getSnapshot(store) },
  }
}
