export const TrafficCountyViewModelType = {
  Loading: 'Loading',
  Rejected: 'Rejected',
  WithTrafficCounties: 'WithTrafficCounties',
  WithoutTrafficCounties: 'WithoutTrafficCounties',
}

export const trafficCountyViewModel = (store) => {
  const trafficCounties = store.trafficCounty.getTrafficCounties()
  const trafficCountiesState = store.trafficCounty.state

  if (trafficCountiesState === 'pending') {
    return {
      type: TrafficCountyViewModelType.Loading,
    }
  }

  if (trafficCountiesState === 'rejected') {
    return {
      type: TrafficCountyViewModelType.Rejected,
    }
  }
  if (
    (trafficCounties.length === 0 && trafficCounties === 'fulfilled') ||
    trafficCounties === 'idle'
  ) {
    return {
      type: TrafficCountyViewModelType.WithoutTrafficCounties,
    }
  }

  return {
    type: TrafficCountyViewModelType.WithTrafficCounties,
    trafficCounties: trafficCounties,
  }
}
