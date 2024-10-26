// useAttorneysPanel.js
import { useState } from 'react'
import { attorneyViewModel } from '@/modules/attorney/ui/panel/attorneys-panel.view-model.js'
import useStore from '@/modules/app/hooks/useStore'
import { getAttorneyByIdUsecase } from '@/modules/attorney/core/usecases/get-attorney-by-id.usecase.js'
import { deleteAttorneyUsecase } from '@/modules/attorney/core/usecases/delete-attorney.usecase.js'

const useAttorneysPanel = () => {
  const store = useStore()
  const viewModel = attorneyViewModel(store.attorney)

  const [openDrawer, setDrawerOpen] = useState(false)
  const [selectedAttorneyToDelete, setSelectedAttorneyToDelete] = useState(null)

  const deleteAttorney = (id) => {
    deleteAttorneyUsecase(id)(store)
  }

  const selectAttorney = async (id) => {
    setDrawerOpen(true)
    await getAttorneyByIdUsecase(id)(store)
  }

  const handleDrawerClose = () => {
    store.attorney.cleanSelectedAttorney()
    setDrawerOpen(false)
  }
  const closeDeleteConfirmation = () => {
    setSelectedAttorneyToDelete(null)
  }
  const confirmDeleteAttorney = (attorney) => {
    deleteAttorney(attorney._id)
    closeDeleteConfirmation()
  }
  return {
    store,
    viewModel,
    openDrawer,
    setDrawerOpen,
    selectedAttorneyToDelete,
    setSelectedAttorneyToDelete,
    deleteAttorney,
    selectAttorney,
    handleDrawerClose,
    confirmDeleteAttorney,
  }
}

export default useAttorneysPanel
