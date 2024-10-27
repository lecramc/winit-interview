import { flow, getParent, types } from 'mobx-state-tree'

export const AuthStore = types
  .model('Auth', {
    user: types.maybeNull(
      types.model('User', { _id: types.identifier, name: types.string, email: types.string }),
    ),
    authState: types.optional(
      types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']),
      'idle',
    ),
    registrationState: types.optional(
      types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']),
      'idle',
    ),
    errorMessage: types.optional(types.string, ''),
  })
  .views((self) => ({
    get isAuthenticated() {
      return !!self.user
    },
  }))
  .actions((self) => ({
    login: flow(function* ({ email, password }) {
      self.authState = 'pending'
      try {
        const authGateway = getParent(self).dependencies.authGateway
        self.user = yield authGateway.login({ email, password })
        self.authState = 'fulfilled'
      } catch (error) {
        self.authState = 'rejected'
        self.errorMessage = error.message
      }
    }),

    logout: flow(function* () {
      self.authState = 'pending'
      try {
        const authGateway = getParent(self).dependencies.authGateway
        yield authGateway.logout()
        self.user = null
        self.authState = 'idle'
      } catch (error) {
        self.authState = 'rejected'
        self.errorMessage = error.message
      }
    }),
    register: flow(function* ({ name, email, password }) {
      self.registrationState = 'pending'
      try {
        const authGateway = getParent(self).dependencies.authGateway
        yield authGateway.register({ name, email, password })
        self.registrationState = 'fulfilled'
      } catch (error) {
        self.registrationState = 'rejected'
        self.errorMessage = error.message
      }
    }),
    getUser: flow(function* (id) {
      self.authState = 'pending'
      try {
        const authGateway = getParent(self).dependencies.authGateway
        self.user = yield authGateway.getUser(id)
        self.authState = 'fulfilled'
      } catch (error) {
        self.authState = 'rejected'
        self.errorMessage = error.message
      }
    }),
  }))
