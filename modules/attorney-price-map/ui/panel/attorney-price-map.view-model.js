export const AttorneyViewModelType = {
  Loading: 'Loading',
  Rejected: 'Rejected',
  WithAttorneys: 'WithAttorneys',
  WithoutAttorneys: 'WithoutAttorneys',
}

export const attorneyViewModel = (attorneyStore) => {
  const attorneys = attorneyStore.attorneys
  const attorneysState = attorneyStore.state

  if (attorneysState === 'pending') {
    return {
      type: AttorneyViewModelType.Loading,
    }
  }

  if (attorneysState === 'rejected') {
    return {
      type: AttorneyViewModelType.Rejected,
    }
  }
  if (attorneys.length === 0 && attorneysState === 'fulfilled') {
    return {
      type: AttorneyViewModelType.WithoutAttorneys,
    }
  }
  return {
    type: AttorneyViewModelType.WithAttorneys,
    attorneys: attorneys,
  }
}
