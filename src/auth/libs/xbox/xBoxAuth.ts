import axios from 'axios'
import { MicrosoftAuthToken } from '../../Auth.types'
import { XSTSTokenTypes } from './xBoxAuth.types'

export async function xAuth(
  token: MicrosoftAuthToken,
  RelyingParty = 'rp://api.minecraftservices.com/'
) {
  const xBoxLiveToken = await axios
    .post<any>(
      'https://user.auth.xboxlive.com/user/authenticate',
      {
        Properties: {
          AuthMethod: 'RPS',
          SiteName: 'user.auth.xboxlive.com',
          RpsTicket: `d=${token.access_token}` // your access token from step 2 here
        },
        RelyingParty: 'http://auth.xboxlive.com',
        TokenType: 'JWT'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    .then((data) => data.data)
    .catch(() => console.warn('CatchOn: XBOXLIVE'))

  if (!xBoxLiveToken) return

  const XSTS = await axios
    .post<XSTSTokenTypes>(
      'https://xsts.auth.xboxlive.com/xsts/authorize',
      {
        Properties: { SandboxId: 'RETAIL', UserTokens: [xBoxLiveToken.Token] },
        RelyingParty,
        TokenType: 'JWT'
      },
      {
        method: 'post',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    .then((data) => data.data)
    .catch(() => console.warn('CatchOn: xAuth'))
  if (!XSTS) return
  return {
    xBoxLiveToken,
    xAuthToken: `XBL3.0 x=${XSTS.DisplayClaims.xui[0].uhs};${XSTS.Token}`
  }
}
