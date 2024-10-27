import {
  priceMapsViewModel,
  PriceMapsViewModelType,
} from '@/modules/attorney-price-map/ui/price-maps.view-model.js'
import { observer } from 'mobx-react'
import { Box, Typography } from '@mui/material'
import LoadingSpinner from '@/modules/app/components/spinner/LoadingSpinner.jsx'
import ErrorMessage from '@/modules/app/components/error/Error.jsx'
import useStore from '@/modules/app/hooks/useStore.js'
import PriceMapsTable from '@/modules/attorney-price-map/ui/PriceMapsTable.jsx'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import { useState } from 'react'
import { getAttorneyPriceMapByIdUsecase } from '@/modules/attorney-price-map/core/usecases/get-attorney-price-map-by-id.usecase.js'
import ConfirmationModal from '@/modules/app/components/modal/ConfirmationModal.jsx'
import { deleteAttorneyPriceMapUsecase } from '@/modules/attorney-price-map/core/usecases/delete-attorney-price-map.usecase.js'
import CustomDrawer from '@/modules/app/components/drawer/CustomDrawer.jsx'
import PriceMapForm from '@/modules/attorney-price-map/ui/PriceMapForm.jsx'

const PriceMaps = observer(() => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const store = useStore()
  const selectedPriceMap = store.attorneyPriceMap.getSelectedPriceMap()
  const viewModel = priceMapsViewModel(store)

  const handleEditRow = async (priceMap) => {
    setOpenDrawer(true)
    await getAttorneyPriceMapByIdUsecase(priceMap._id)(store)
  }
  const handleDeleteRow = async (priceMap) => {
    setItemToDelete(priceMap)
  }
  const closeDeleteConfirmation = () => {
    setItemToDelete(null)
  }
  const confirmDeleteAttorney = async (priceMap) => {
    await deleteAttorneyPriceMapUsecase(priceMap._id)(store)
    closeDeleteConfirmation()
  }
  const handleCloseDrawer = () => {
    setOpenDrawer(false)
    store.attorneyPriceMap.cleanSelectedPriceMap()
  }
  const contentNode = (() => {
    switch (viewModel.type) {
      case PriceMapsViewModelType.WithoutPriceMaps:
        return (
          <Typography variant="h5" align="center">
            Without Price Maps...
          </Typography>
        )
      case PriceMapsViewModelType.Loading:
        return <LoadingSpinner message="Loading Price Maps..." />
      case PriceMapsViewModelType.Rejected:
        return (
          <ErrorMessage message="Error Loading Price Maps" description={viewModel.errorMessage} />
        )
      case PriceMapsViewModelType.WithPriceMaps:
        return (
          <>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
              <CustomButton color="primary" onClick={() => setOpenDrawer(true)} selfEnd>
                Create Price Map
              </CustomButton>
            </Box>

            <PriceMapsTable
              priceMaps={viewModel.priceMaps}
              onEdit={handleEditRow}
              onDelete={handleDeleteRow}
            />
            <CustomDrawer
              open={openDrawer}
              onClose={handleCloseDrawer}
              title={selectedPriceMap ? 'Edit Traffic State' : 'Create Traffic State'}
            >
              <PriceMapForm selectedPriceMap={selectedPriceMap} onClose={handleCloseDrawer} />
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
        onConfirm={() => confirmDeleteAttorney(itemToDelete)}
        title="Confirm Deletion"
        message={`Are you sure you want to delete this price map ${itemToDelete?.name}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      {contentNode}
    </>
  )
})

export default PriceMaps
