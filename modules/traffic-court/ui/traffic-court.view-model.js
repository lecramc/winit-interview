export const TrafficCourtViewModelType = {
  Loading: 'Loading',
  Rejected: 'Rejected',
  WithTrafficCourts: 'WithTrafficCourts',
  WithoutTrafficCourts: 'WithoutTrafficCourts',
}
export const trafficCourtViewModel = (store) => {
  const trafficCourts = store.trafficCourt.getTrafficCourts()
  const trafficCourtsState = store.trafficCourt.state

  if (trafficCourtsState === 'pending') {
    return {
      type: TrafficCourtViewModelType.Loading,
    }
  }

  if (trafficCourtsState === 'rejected') {
    return {
      type: TrafficCourtViewModelType.Rejected,
    }
  }
  if ((trafficCourts.length === 0 && trafficCourts === 'fulfilled') || trafficCourts === 'idle') {
    return {
      type: TrafficCourtViewModelType.WithoutTrafficCourts,
    }
  }

  return {
    type: TrafficCourtViewModelType.WithTrafficCourts,
    trafficCourts: trafficCourts,
  }
}
