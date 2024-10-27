import { observer } from 'mobx-react'
import { Box, Typography } from '@mui/material'
import LoadingSpinner from '@/modules/app/components/spinner/LoadingSpinner.jsx'
import ErrorMessage from '@/modules/app/components/error/Error.jsx'
import useStore from '@/modules/app/hooks/useStore.js'
import TrafficCountyTable from '@/modules/traffic-county/ui/TrafficCountyTable.jsx'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import { useState } from 'react'
import ConfirmationModal from '@/modules/app/components/modal/ConfirmationModal.jsx'
import { deleteTrafficCountyUsecase } from '@/modules/traffic-county/core/usecases/delete-traffic-county.usecase.js'
import { getTrafficCountyByIdUsecase } from '@/modules/traffic-county/core/usecases/get-traffic-county-by-id.usecase.js'
import { trafficCountyViewModel } from '@/modules/traffic-county/ui/traffic-county.view-model.js'
import CustomDrawer from '@/modules/app/components/drawer/CustomDrawer.jsx'
import TrafficCountyForm from '@/modules/traffic-county/ui/TrafficCountyForm.jsx'

const TrafficCounties = observer(() => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const store = useStore()
  const viewModel = trafficCountyViewModel(store)
  const selectedTrafficCounty = store.trafficCounty.getSelectedTrafficCounty()
  const handleEditRow = async (trafficCounty) => {
    setOpenDrawer(true)
    await getTrafficCountyByIdUsecase(trafficCounty._id)(store)
  }

  const handleDeleteRow = (trafficCounty) => {
    setItemToDelete(trafficCounty)
  }

  const closeDeleteConfirmation = () => {
    setItemToDelete(null)
  }

  const confirmDeleteTrafficCounty = async () => {
    await deleteTrafficCountyUsecase(itemToDelete._id)(store)
    closeDeleteConfirmation()
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
    store.trafficCounty.clearSelectedTrafficCounty()
  }

  const contentNode = (() => {
    switch (viewModel.type) {
      case 'WithoutTrafficCounties':
        return (
          <Typography variant="h5" align="center">
            No Traffic Counties Found
          </Typography>
        )
      case 'Loading':
        return <LoadingSpinner message="Loading Traffic Counties..." />
      case 'Rejected':
        return <ErrorMessage message="Error Loading Traffic Counties" />
      case 'WithTrafficCounties':
        return (
          <>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
              <CustomButton color="primary" onClick={() => setOpenDrawer(true)}>
                Create Traffic County
              </CustomButton>
            </Box>
            <TrafficCountyTable
              trafficCounties={viewModel.trafficCounties}
              onEdit={handleEditRow}
              onDelete={handleDeleteRow}
            />
            <CustomDrawer
              open={openDrawer}
              onClose={handleCloseDrawer}
              title={selectedTrafficCounty ? 'Edit Traffic County' : 'Create Traffic County'}
            >
              <TrafficCountyForm
                selectedTrafficCounty={selectedTrafficCounty}
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
        onConfirm={confirmDeleteTrafficCounty}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the county "${itemToDelete?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      {contentNode}
    </>
  )
})

export default TrafficCounties
