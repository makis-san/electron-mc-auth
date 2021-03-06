import axios from 'axios'
import { URLSearchParams } from 'url'
import { MicrosoftAuthToken } from '../Auth.types'
import { MinecraftProfileTypes } from '../Mojang.types'

export async function refresh(profile: MinecraftProfileTypes) {
  if (this.validate(profile.expires_in)) return this

  const params = new URLSearchParams()
  params.append('client_id', profile.client_id)
  params.append('client_secret', profile.clientSecret)
  params.append('refresh_token', profile.refresh_token)
  params.append('grant_type', 'refresh_token')
  const { token } = this.getLink('login')

  const Microsoft = await axios
    .post<MicrosoftAuthToken>(
      'https://login.live.com/oauth20_token.srf',
      params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    )
    .then((data) => data.data)

  return this.getMinecraft(token, Microsoft)
}
