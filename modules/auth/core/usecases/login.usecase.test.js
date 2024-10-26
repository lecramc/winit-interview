// modules/auth/core/usecases/signIn.usecase.test.js
import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeAuthGateway } from '@/modules/auth/core/gateways-infra/fake-auth.gateway.js'
import { loginUsecase } from '@/modules/auth/core/usecases/login.usecase.js'

describe('Feature: sign in', () => {
  test('User successfully signs in', async () => {
    const credentials = { email: 'test@example.com', password: 'password123' }
    await whenSigningIn(credentials)

    thenUserShouldBeAuthenticated()
  })
})

const authGateway = new FakeAuthGateway()
const store = createTestStore({ dependencies: { authGateway } })

async function whenSigningIn(credentials) {
  await loginUsecase({ email: credentials.email, password: credentials.password })(store)
}

function thenUserShouldBeAuthenticated() {
  expect(store.auth.isAuthenticated).toBe(true)
}
