import axios from "axios";
import { URLSearchParams } from "url";
import { MicrosoftToken } from "../Auth.types";

export const login = async (token: MicrosoftToken, code: string) => {
  try {
    const params = new URLSearchParams();

    params.append("client_id", token.client_id);
    params.append("client_secret", token.clientSecret);
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", token.redirect);

    const Microsoft = await axios
      .post("https://login.live.com/oauth20_token.srf?", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((data) => data.data);

    const XboxLive = await axios
      .post(
        "https://user.auth.xboxlive.com/user/authenticate",
        {
          Properties: {
            AuthMethod: "RPS",
            SiteName: "user.auth.xboxlive.com",
            RpsTicket: `d=${Microsoft.access_token}`, // your access token from step 2 here
          },
          RelyingParty: "http://auth.xboxlive.com",
          TokenType: "JWT",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((data) => data);
    return {
      XboxLive,
      Microsoft,
    };
  } catch (e) {
    console.warn(e);
  }
};
