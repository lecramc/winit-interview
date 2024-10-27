import { observer } from 'mobx-react'
import { Box, Typography } from '@mui/material'
import LoadingSpinner from '@/modules/app/components/spinner/LoadingSpinner.jsx'
import ErrorMessage from '@/modules/app/components/error/Error.jsx'
import useStore from '@/modules/app/hooks/useStore.js'
import ViolationTable from '@/modules/violation/ui/ViolationTable.jsx'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import { useState } from 'react'
import ConfirmationModal from '@/modules/app/components/modal/ConfirmationModal.jsx'
import { violationViewModel } from '@/modules/violation/ui/violation.view-model.js'
import { getViolationByIdUsecase } from '@/modules/violation/core/usecases/get-violation-by-id.usecase.js'
import { deleteViolationUsecase } from '@/modules/violation/core/usecases/delete-violation.usecase.js'
import ViolationForm from '@/modules/violation/ui/ViolationForm.jsx'
import CustomDrawer from '@/modules/app/components/drawer/CustomDrawer.jsx'

const Violations = observer(() => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const store = useStore()
  const viewModel = violationViewModel(store)
  const selectedViolation = store.violation.getSelectedViolation()

  const handleEditRow = async (violation) => {
    setOpenDrawer(true)
    await getViolationByIdUsecase(violation._id)(store)
  }

  const handleDeleteRow = (violation) => {
    setItemToDelete(violation)
  }

  const closeDeleteConfirmation = () => {
    setItemToDelete(null)
  }

  const confirmDeleteViolation = async () => {
    await deleteViolationUsecase(itemToDelete._id)(store)
    closeDeleteConfirmation()
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
    store.violation.clearSelectedViolation()
  }

  const contentNode = (() => {
    switch (viewModel.type) {
      case 'WithoutViolations':
        return (
          <Typography variant="h5" align="center">
            No Violations Found
          </Typography>
        )
      case 'Loading':
        return <LoadingSpinner message="Loading Violations..." />
      case 'Rejected':
        return <ErrorMessage message="Error Loading Violations" />
      case 'WithViolations':
        return (
          <>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
              <CustomButton color="primary" onClick={() => setOpenDrawer(true)}>
                Create Violation
              </CustomButton>
            </Box>
            <ViolationTable
              violations={viewModel.violations}
              onEdit={handleEditRow}
              onDelete={handleDeleteRow}
            />
            <CustomDrawer
              open={openDrawer}
              onClose={handleCloseDrawer}
              title={selectedViolation ? 'Edit Violation' : 'Create Violation'}
            >
              <ViolationForm selectedViolation={selectedViolation} onClose={handleCloseDrawer} />
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
        onConfirm={confirmDeleteViolation}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the violation "${itemToDelete?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      {contentNode}
    </>
  )
})

export default Violations
