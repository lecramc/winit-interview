export class ViolationFactory {
  static create(data = {}) {
    return {
      _id: '',
      name: '',
      points: 0,
      enable: true,
      ...data,
    }
  }
}
