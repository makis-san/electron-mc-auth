export function validate(expiration: number) {
  return expiration > Date.now()
}
