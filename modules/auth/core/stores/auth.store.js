import { flow, getParent, types } from 'mobx-state-tree'

export const AuthStore = types
  .model('Auth', {
    user: types.maybeNull(types.model('User', { name: '', email: '' })),
    authState: types.optional(
      types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']),
      'idle',
    ),
    registrationState: types.optional(
      types.enumeration(['pending', 'fulfilled', 'rejected', 'idle']),
      'idle',
    ),
  })
  .actions((self) => ({
    login: flow(function* ({ email, password }) {
      self.authState = 'pending'
      try {
        const authGateway = getParent(self).dependencies.authGateway
        self.user = yield authGateway.login({ email, password })

        self.isAuthenticated = true
        self.authState = 'fulfilled'
      } catch (error) {
        self.authState = 'rejected'
        console.error('Login failed:', error)
      }
    }),

    logout: flow(function* () {
      self.authState = 'pending'
      try {
        const authGateway = getParent(self).dependencies.authGateway
        yield authGateway.logout()
        self.user = null
        self.isAuthenticated = false
        self.authState = 'fulfilled'
      } catch (error) {
        self.authState = 'rejected'
        console.error('Logout failed:', error)
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
        console.error('Register failed:', error)
      }
    }),
  }))
