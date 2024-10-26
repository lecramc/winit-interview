import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeAuthGateway } from '@/modules/auth/core/gateways-infra/fake-auth.gateway.js'
import { getUserUsecase } from '@/modules/auth/core/usecases/get-user.usecase.js'
import { UserFactory } from '@/modules/auth/core/entities/user.factory.js'

describe('Feature: retrieve user', () => {
  test('User is successfully retrieved and authenticated', async () => {
    const userId = 'user-123'
    await whenRetrievingUser(userId)

    thenUserShouldBeAuthenticated(
      UserFactory.create({ _id: 'user-123', email: 'user@example.com' }),
    )
  })
})

const authGateway = new FakeAuthGateway()
const store = createTestStore({ dependencies: { authGateway } })

async function whenRetrievingUser(userId) {
  await getUserUsecase(userId)(store)
}

function thenUserShouldBeAuthenticated(expectedUser) {
  expect(store.auth.isAuthenticated).toBe(true)
  expect(store.auth.user).toEqual(expectedUser)
}
