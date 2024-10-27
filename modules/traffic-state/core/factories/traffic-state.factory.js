export class TrafficStateFactory {
  static create(data = {}) {
    return {
      _id: data._id || '',
      longName: data.longName || '',
      shortName: data.shortName || '',
      enable: true,
      ...data,
    }
  }
}
