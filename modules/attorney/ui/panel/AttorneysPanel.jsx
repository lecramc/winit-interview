// AttorneysPanel.jsx
import { observer } from 'mobx-react'
import { Typography } from '@mui/material'
import { AttorneyViewModelType } from '@/modules/attorney/ui/panel/attorneys-panel.view-model.js'

import AttorneysList from '@/modules/attorney/ui/panel/components/AttorneysList.jsx'
import ErrorMessage from '@/modules/app/components/error/Error.jsx'
import LoadingSpinner from '@/modules/app/components/spinner/LoadingSpinner.jsx'
import AttorneyDrawer from '@/modules/attorney/ui/panel/components/AttorneyDrawer.jsx'
import ConfirmationModal from '@/modules/app/components/modal/ConfirmationModal.jsx'
import useAttorneysPanel from '@/modules/attorney/ui/panel/hooks/useAttorneyPanel.js'

const AttorneysPanel = observer(() => {
  const {
    store,
    viewModel,
    openDrawer,
    setDrawerOpen,
    selectedAttorneyToDelete,
    setSelectedAttorneyToDelete,
    selectAttorney,
    handleDrawerClose,
    closeDeleteConfirmation,
    confirmDeleteAttorney,
  } = useAttorneysPanel()

  const contentNode = (() => {
    switch (viewModel.type) {
      case AttorneyViewModelType.WithoutAttorneys:
        return (
          <Typography variant="h5" align="center">
            Without Attorneys...
          </Typography>
        )
      case AttorneyViewModelType.Loading:
        return <LoadingSpinner message="Loading Attorneys..." />
      case AttorneyViewModelType.Rejected:
        return (
          <ErrorMessage message="Error Loading Attorneys" description={viewModel.errorMessage} />
        )
      case AttorneyViewModelType.WithAttorneys:
        return (
          <AttorneysList
            attorneys={viewModel.attorneys}
            editAttorney={selectAttorney}
            deleteAttorney={setSelectedAttorneyToDelete}
            createAttorney={() => setDrawerOpen(true)}
          />
        )
      default:
        return null
    }
  })()

  return (
    <>
      <ConfirmationModal
        open={selectedAttorneyToDelete !== null}
        onClose={closeDeleteConfirmation}
        onConfirm={() => confirmDeleteAttorney(selectedAttorneyToDelete)}
        title="Confirm Deletion"
        message={`Are you sure you want to delete this attorney ${selectedAttorneyToDelete?.name}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <AttorneyDrawer open={openDrawer} handleClose={handleDrawerClose} store={store} />
      {contentNode}
    </>
  )
})

export default AttorneysPanel
