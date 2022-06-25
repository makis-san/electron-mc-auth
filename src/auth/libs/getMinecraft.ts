import axios from 'axios'
import { MicrosoftAuthToken, MicrosoftToken } from '../Auth.types'
import { MinecraftProfileTypes } from '../Mojang.types'
import { xAuth } from './xbox/xBoxAuth'

export async function getMinecraft(
  token: MicrosoftToken,
  Microsoft: MicrosoftAuthToken
) {
  const { xBoxLiveToken, xAuthToken } = await xAuth(Microsoft)

  if (!xAuthToken) return

  const MCAuth = await axios
    .post(
      'https://api.minecraftservices.com/authentication/login_with_xbox',
      {
        identityToken: xAuthToken
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    .then((data) => data.data)
    .catch((e) => this.logger.error(`Minecraft Login Failed ${e}`))

  const profile = axios
    .get<MinecraftProfileTypes>(
      'https://api.minecraftservices.com/minecraft/profile',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${MCAuth.access_token}`
        }
      }
    )
    .then((data) => ({
      ...token,
      ...data.data,
      access_token: Microsoft.access_token,
      client_token: xBoxLiveToken.client_token,
      expires_in: Microsoft.expires_in,
      refresh_token: Microsoft.refresh_token
    }))
    .catch((e) => this.logger.error(`Minecraft Profile Fetch Failed ${e}`))

  if (!profile) return

  return profile
}
