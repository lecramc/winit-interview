import { observer } from 'mobx-react'
import { Box, Typography } from '@mui/material'
import LoadingSpinner from '@/modules/app/components/spinner/LoadingSpinner.jsx'
import ErrorMessage from '@/modules/app/components/error/Error.jsx'
import useStore from '@/modules/app/hooks/useStore.js'
import TrafficCourtTable from '@/modules/traffic-court/ui/TrafficCourtTable.jsx'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import { useState } from 'react'
import ConfirmationModal from '@/modules/app/components/modal/ConfirmationModal.jsx'
import { trafficCourtViewModel } from '@/modules/traffic-court/ui/traffic-court.view-model.js'
import { getTrafficCourtByIdUsecase } from '@/modules/traffic-court/core/usecases/get-traffic-court-by-id.usecase.js'
import { deleteTrafficCourtUsecase } from '@/modules/traffic-court/core/usecases/delete-traffic-court.usecase.js'
import CustomDrawer from '@/modules/app/components/drawer/CustomDrawer.jsx'
import TrafficCourtForm from '@/modules/traffic-court/ui/TrafficCourtForm.jsx'

const TrafficCourts = observer(() => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const store = useStore()
  const viewModel = trafficCourtViewModel(store)
  const selectedTrafficCourt = store.trafficCourt.getSelectedTrafficCourt()
  const handleEditRow = async (trafficCourt) => {
    setOpenDrawer(true)
    await getTrafficCourtByIdUsecase(trafficCourt._id)(store)
  }

  const handleDeleteRow = (trafficCourt) => {
    setItemToDelete(trafficCourt)
  }

  const closeDeleteConfirmation = () => {
    setItemToDelete(null)
  }

  const confirmDeleteTrafficCourt = async () => {
    await deleteTrafficCourtUsecase(itemToDelete._id)(store)
    closeDeleteConfirmation()
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
    store.trafficCourt.clearSelectedTrafficCourt()
  }
  const contentNode = (() => {
    switch (viewModel.type) {
      case 'WithoutTrafficCourts':
        return (
          <Typography variant="h5" align="center">
            No Traffic Courts Found
          </Typography>
        )
      case 'Loading':
        return <LoadingSpinner message="Loading Traffic Courts..." />
      case 'Rejected':
        return <ErrorMessage message="Error Loading Traffic Courts" />
      case 'WithTrafficCourts':
        return (
          <>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
              <CustomButton color="primary" onClick={() => setOpenDrawer(true)}>
                Create Traffic Court
              </CustomButton>
            </Box>
            <TrafficCourtTable
              trafficCourts={viewModel.trafficCourts}
              onEdit={handleEditRow}
              onDelete={handleDeleteRow}
            />
            <CustomDrawer
              open={openDrawer}
              onClose={handleCloseDrawer}
              title={selectedTrafficCourt ? 'Edit Traffic County' : 'Create Traffic County'}
            >
              <TrafficCourtForm
                selectedTrafficCourt={selectedTrafficCourt}
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
        onConfirm={confirmDeleteTrafficCourt}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the court "${itemToDelete?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      {contentNode}
    </>
  )
})

export default TrafficCourts
