export class AttorneyFactory {
  static create(data = {}) {
    return {
      _id: '',
      name: '',
      email: '',
      address: '',
      phone: '',
      ...data,
    }
  }
}
