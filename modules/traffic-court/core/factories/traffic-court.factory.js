export class TrafficCourtFactory {
  static create(data = {}) {
    return {
      _id: '',
      name: '',
      address: '',
      trafficState: '',
      trafficCounty: '',
      ...data,
    }
  }
}
