export const login = async (gateway, { email, password }) => {
  return await gateway.login({ email, password })
}
