import { observer } from 'mobx-react'
import { Box, Container, Paper, Typography } from '@mui/material'

import useStore from '@/modules/app/hooks/useStore'
import {
  attorneyViewModel,
  AttorneyViewModelType,
} from '@/modules/attorney/ui/panel/attorneys-panel.view-model.js'
import HeaderPanel from '@/modules/attorney/ui/panel/components/HeaderPanel.jsx'
import AttorneyList from '@/modules/attorney/ui/panel/components/AttorneysList.jsx'
import FooterPanel from '@/modules/attorney/ui/panel/components/FooterPanel.jsx'

const AttorneyPriceMap = observer(() => {
  const { attorney: attorneyStore } = useStore()

  const viewModel = attorneyViewModel(attorneyStore)

  let content

  switch (viewModel.type) {
    case AttorneyViewModelType.WithoutAttorneys:
      content = (
        <Typography variant="h5" align="center">
          Without Attorneys...
        </Typography>
      )
      break
    case AttorneyViewModelType.Loading:
      content = (
        <Typography variant="h5" align="center">
          Loading Attorneys...
        </Typography>
      )
      break
    case AttorneyViewModelType.Rejected:
      content = (
        <Typography variant="h5" align="center" color="error">
          Error Loading Attorneys
        </Typography>
      )
      break
    case AttorneyViewModelType.WithAttorneys:
      content = (
        <>
          <HeaderPanel />
          <AttorneyList
            attorneys={viewModel.attorneys}
            deleteAttorney={attorneyStore.deleteAttorney}
          />
          <FooterPanel />
        </>
      )
      break
    default:
      content = null
  }

  return (
    <Box sx={{ backgroundColor: '#ffcc80', minHeight: '100vh', py: 4 }}>
      <Container component={Paper} sx={{ py: 4 }}>
        {content}
      </Container>
    </Box>
  )
})

export default AttorneyPriceMap
