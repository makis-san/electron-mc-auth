import axios from 'axios'
import { URLSearchParams } from 'url'
import { MicrosoftAuthToken, MicrosoftToken } from '../Auth.types'
import { MinecraftProfileTypes } from '../Mojang.types'
import { getMinecraft } from './getMinecraft'

export async function login(
  token: MicrosoftToken,
  code: string
): Promise<MinecraftProfileTypes> {
  const params = new URLSearchParams()

  params.append('client_id', token.client_id)
  params.append('client_secret', token.clientSecret)
  params.append('code', code)
  params.append('grant_type', 'authorization_code')
  params.append('redirect_uri', token.redirect)

  const Microsoft = await axios
    .post<MicrosoftAuthToken>(
      'https://login.live.com/oauth20_token.srf?',
      params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    )
    .then((data) => data.data)
    .catch((e) => this.logger.error(`Microsoft Login Failed ${e}`))

  if (!Microsoft) return

  return getMinecraft(token, Microsoft)
}
