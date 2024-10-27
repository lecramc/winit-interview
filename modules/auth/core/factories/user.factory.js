export class UserFactory {
  static create(data = {}) {
    return {
      _id: '',
      name: '',
      email: '',
      ...data,
    }
  }
}
