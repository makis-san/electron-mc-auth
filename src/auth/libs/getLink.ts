import { MojangAuthToken } from '../Mojang'
import { PromptTypes } from '../Mojang.types'

export function getLink(prompt: PromptTypes = 'select_account') {
  const token = MojangAuthToken(prompt)
  const url = `https://login.live.com/oauth20_authorize.srf?client_id=${
    token.client_id
  }&response_type=code&redirect_uri=${
    token.redirect
  }&scope=XboxLive.signin%20offline_access${
    token.prompt ? `&prompt=${token.prompt}` : ''
  }&mkt=en-US`
  return { url, token }
}
