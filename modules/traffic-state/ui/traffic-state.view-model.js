export const TrafficStateViewModelType = {
  Loading: 'Loading',
  Rejected: 'Rejected',
  WithTrafficStates: 'WithTrafficStates',
  WithoutTrafficStates: 'WithoutTrafficStates',
}

export const trafficStateViewModel = (store) => {
  const trafficStates = store.trafficState.getTrafficStates()
  const trafficStatesState = store.trafficState.state

  if (trafficStatesState === 'pending') {
    return {
      type: TrafficStateViewModelType.Loading,
    }
  }

  if (trafficStatesState === 'rejected') {
    return {
      type: TrafficStateViewModelType.Rejected,
    }
  }
  if (
    (trafficStates.length === 0 && trafficStatesState === 'fulfilled') ||
    trafficStatesState === 'idle'
  ) {
    return {
      type: TrafficStateViewModelType.WithoutTrafficStates,
    }
  }

  return {
    type: TrafficStateViewModelType.WithTrafficStates,
    trafficStates: trafficStates,
  }
}
