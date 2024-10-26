export class TrafficCountyFactory {
  static create(data = {}) {
    return {
      _id: '',
      name: '',
      trafficState: '',
      enabled: true,
      ...data,
    }
  }
}
