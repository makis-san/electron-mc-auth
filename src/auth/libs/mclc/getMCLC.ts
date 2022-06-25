import { MCLCAuthTypes, MinecraftProfileTypes } from '../../Mojang.types'

export function getMCLC(profile: MinecraftProfileTypes): MCLCAuthTypes {
  return {
    access_token: profile.access_token,
    client_token: profile.client_token,
    uuid: profile.id,
    name: profile.name,
    meta: {
      demo: false,
      type: 'msa'
    }
  }
}
