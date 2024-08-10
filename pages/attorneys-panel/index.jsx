import { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject(({ store }) => store)
@observer
class AttorneysPanelPage extends Component {
  render() {
    return 'AttorneysPanelPage'
  }
}

export default AttorneysPanelPage
