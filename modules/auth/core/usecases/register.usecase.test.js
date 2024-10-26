import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeAuthGateway } from '@/modules/auth/core/gateways-infra/fake-auth.gateway.js'
import { registerUsecase } from '@/modules/auth/core/usecases/register.usecase.js'

describe('Feature: User Registration', () => {
  test('User registers successfully', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecureP@ss123',
    }

    await whenRegisteringNewUser(newUser)

    thenUserShouldBeRegistered()
  })
})

const authGateway = new FakeAuthGateway()
const store = createTestStore({ dependencies: { authGateway } })

async function whenRegisteringNewUser(userData) {
  await registerUsecase(userData)(store)
}

function thenUserShouldBeRegistered() {
  expect(store.auth.registrationState).toBe('fulfilled')
}
