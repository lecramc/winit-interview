export class TrafficStateFactory {
  static create(data = {}) {
    return {
      _id: '',
      longName: '',
      shortName: '',
      ...data,
    }
  }
}
