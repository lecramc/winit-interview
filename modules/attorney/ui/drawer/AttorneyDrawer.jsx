// AttorneyDrawer.jsx
import React, { useEffect } from 'react'
import { Box, Drawer, IconButton, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import {
  attorneyDrawerViewModel,
  AttorneyDrawerViewModelType,
} from '@/modules/attorney/ui/drawer/attorney-drawer.viewmodel.js'
import ErrorMessage from '@/modules/app/components/error/Error.jsx'
import LoadingSpinner from '@/modules/app/components/spinner/LoadingSpinner.jsx'
import { updateAttorneyUsecase } from '@/modules/attorney/core/usecases/update-attorney.usecase.js'
import { createAttorneyUsecase } from '@/modules/attorney/core/usecases/create-attorney.usecase.js'
import { AttorneyForm } from '@/modules/attorney/ui/AttorneyForm.jsx'
import PriceMapsList from '@/modules/attorney-price-map/ui/PriceMapsTable.jsx'

const AttorneyDrawer = ({ open, handleClose, store }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      _id: '',
      name: '',
      email: '',
      address: '',
      phone: '',
      enable: true,
    },
  })

  const viewModel = attorneyDrawerViewModel(store)

  useEffect(() => {
    if (viewModel.type === AttorneyDrawerViewModelType.Edit) {
      reset({
        _id: viewModel.attorney._id,
        name: viewModel.attorney.name,
        email: viewModel.attorney.email,
        address: viewModel.attorney.address,
        phone: viewModel.attorney.phone,
        enable: viewModel.attorney.enable,
      })
    } else {
      reset({
        name: '',
        email: '',
        address: '',
        phone: '',
        enable: true,
      })
    }
  }, [viewModel.type])

  const submitHandler = async (data) => {
    if (viewModel.type === AttorneyDrawerViewModelType.Edit) {
      await updateAttorneyUsecase(data)(store)
    } else {
      await createAttorneyUsecase(data)(store)
    }
    handleClose()
    reset()
  }

  const drawerContentNode = (() => {
    switch (viewModel.type) {
      case AttorneyDrawerViewModelType.Loading:
        return <LoadingSpinner message="Loading Attorney..." />

      case AttorneyDrawerViewModelType.Rejected:
        return (
          <ErrorMessage
            message="Error loading attorney data"
            description={viewModel.errorMessage}
          />
        )

      case AttorneyDrawerViewModelType.Create:
        return (
          <AttorneyForm
            control={control}
            handleSubmit={handleSubmit}
            submitHandler={submitHandler}
            viewModel={viewModel}
            handleClose={handleClose}
          />
        )
      case AttorneyDrawerViewModelType.Edit:
        return (
          <>
            <AttorneyForm
              control={control}
              handleSubmit={handleSubmit}
              submitHandler={submitHandler}
              viewModel={viewModel}
              handleClose={handleClose}
            />
          </>
        )

      default:
        return null
    }
  })()

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: '600px' },
          maxWidth: '100vw',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {viewModel.type === AttorneyDrawerViewModelType.Edit
            ? 'Edit Attorney'
            : 'Create Attorney'}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 2 }}>{drawerContentNode}</Box>
    </Drawer>
  )
}

export default AttorneyDrawer
