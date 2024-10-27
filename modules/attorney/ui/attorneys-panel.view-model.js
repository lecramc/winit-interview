export const AttorneyViewModelType = {
  Loading: 'Loading',
  Rejected: 'Rejected',
  WithAttorneys: 'WithAttorneys',
  WithoutAttorneys: 'WithoutAttorneys',
}

export const attorneyViewModel = (store) => {
  const attorneys = store.attorney.attorneys
  const attorneysState = store.attorney.state

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
  if ((attorneys.length === 0 && attorneysState === 'fulfilled') || attorneysState === 'idle') {
    return {
      type: AttorneyViewModelType.WithoutAttorneys,
    }
  }

  return {
    type: AttorneyViewModelType.WithAttorneys,
    attorneys: attorneys,
  }
}
