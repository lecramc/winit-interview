import { getSnapshot } from 'mobx-state-tree'
import { prefetchPage } from '@/modules/app/utils/prefetchPage.js'

export default function Page() {
  return <div>Dashboard</div>
}
export async function getServerSideProps(ctx) {
  const store = await prefetchPage(ctx)
  return {
    props: { initialState: getSnapshot(store) },
  }
}
