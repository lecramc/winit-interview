// AttorneyModalViewModel.js

export const AttorneyDrawerViewModelType = {
  Loading: 'Loading',
  Rejected: 'Rejected',
  Create: 'Create',
  Edit: 'Edit',
}

export const attorneyDrawerViewModel = (store) => {
  const attorneyStore = store.attorney
  const selectedAttorney = attorneyStore.getSelectedAttorney()
  const selectedAttorneyState = attorneyStore.state

  if (selectedAttorneyState === 'pending') {
    return {
      type: AttorneyDrawerViewModelType.Loading,
    }
  }

  if (selectedAttorneyState === 'rejected') {
    return {
      type: AttorneyDrawerViewModelType.Rejected,
    }
  }

  if (!selectedAttorney) {
    return {
      type: AttorneyDrawerViewModelType.Create,
    }
  }
  return {
    type: AttorneyDrawerViewModelType.Edit,
    attorney: selectedAttorney,
  }
}
