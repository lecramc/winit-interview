import { observer } from 'mobx-react'
import { Box, Typography } from '@mui/material'
import LoadingSpinner from '@/modules/app/components/spinner/LoadingSpinner.jsx'
import ErrorMessage from '@/modules/app/components/error/Error.jsx'
import useStore from '@/modules/app/hooks/useStore.js'
import TrafficStateTable from '@/modules/traffic-state/ui/TrafficStateTable.jsx'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import { useState } from 'react'
import ConfirmationModal from '@/modules/app/components/modal/ConfirmationModal.jsx'
import { trafficStateViewModel } from '@/modules/traffic-state/ui/traffic-state.view-model.js'
import { getTrafficStateByIdUsecase } from '@/modules/traffic-state/core/usecases/get-traffic-state-by-id.usecase.js'
import { deleteTrafficStateUsecase } from '@/modules/traffic-state/core/usecases/delete-traffic-state.usecase.js'
import CustomDrawer from '@/modules/app/components/drawer/CustomDrawer.jsx'
import TrafficStateForm from '@/modules/traffic-state/ui/TrafficStateForm.jsx'

const TrafficStates = observer(() => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const store = useStore()
  const viewModel = trafficStateViewModel(store)
  const selectedTrafficState = store.trafficState.getSelectedTrafficState()
  const handleEditRow = async (trafficState) => {
    setOpenDrawer(true)
    await getTrafficStateByIdUsecase(trafficState._id)(store)
  }

  const handleDeleteRow = (trafficState) => {
    setItemToDelete(trafficState)
  }

  const closeDeleteConfirmation = () => {
    setItemToDelete(null)
  }

  const confirmDeleteTrafficState = async () => {
    await deleteTrafficStateUsecase(itemToDelete._id)(store)
    closeDeleteConfirmation()
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
    store.trafficState.clearSelectedTrafficState()
  }

  const contentNode = (() => {
    switch (viewModel.type) {
      case 'WithoutTrafficStates':
        return (
          <Typography variant="h5" align="center">
            No Traffic States Found
          </Typography>
        )
      case 'Loading':
        return <LoadingSpinner message="Loading Traffic States..." />
      case 'Rejected':
        return <ErrorMessage message="Error Loading Traffic States" />
      case 'WithTrafficStates':
        return (
          <>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
              <CustomButton color="primary" onClick={() => setOpenDrawer(true)}>
                Create Traffic State
              </CustomButton>
            </Box>
            <TrafficStateTable
              trafficStates={viewModel.trafficStates}
              onEdit={handleEditRow}
              onDelete={handleDeleteRow}
            />
            <CustomDrawer
              open={openDrawer}
              onClose={handleCloseDrawer}
              title={selectedTrafficState ? 'Edit Traffic State' : 'Create Traffic State'}
            >
              <TrafficStateForm
                selectedTrafficState={selectedTrafficState}
                onClose={handleCloseDrawer}
              />
            </CustomDrawer>
          </>
        )
      default:
        return null
    }
  })()

  return (
    <>
      <ConfirmationModal
        open={itemToDelete !== null}
        onClose={closeDeleteConfirmation}
        onConfirm={confirmDeleteTrafficState}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the state "${itemToDelete?.longName}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      {contentNode}
    </>
  )
})

export default TrafficStates
