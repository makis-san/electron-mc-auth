import axios from "axios";
import { URLSearchParams } from "url";
import { MicrosoftToken } from "../Auth.types";
import { MinecraftProfileTypes } from "../Mojang.types";
import { xAuth } from "./xbox/xBoxAuth";

export const login = async (
  token: MicrosoftToken,
  code: string
): Promise<MinecraftProfileTypes> => {
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
    .then((data) => data.data)
    .catch(() => console.warn("CatchOn: MICROSOFT"));

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
    .then((data) => data.data)
    .catch(() => console.warn("CatchOn: XBOXLIVE"));
  const xAuthToken = await xAuth(XboxLive.Token);

  const MCAuth = await axios
    .post(
      "https://api.minecraftservices.com/authentication/login_with_xbox",
      {
        identityToken: xAuthToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((data) => data.data)
    .catch(() => console.warn("CatchOn: MCAUTH"));

  return axios
    .get<MinecraftProfileTypes>(
      "https://api.minecraftservices.com/minecraft/profile",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MCAuth.access_token}`,
        },
      }
    )
    .then((data) => ({
      access_token: Microsoft.access_token,
      client_token: XboxLive.client_token,
      ...data.data,
    }));
};
