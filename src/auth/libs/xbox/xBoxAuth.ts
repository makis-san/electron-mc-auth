import axios from "axios";

export const xAuth = async (
  token: string,
  RelyingParty = "rp://api.minecraftservices.com/"
) => {
  console.log(token);

  const XSTS = await axios
    .post(
      "https://xsts.auth.xboxlive.com/xsts/authorize",
      {
        Properties: { SandboxId: "RETAIL", UserTokens: [token] },
        RelyingParty,
        TokenType: "JWT",
      },
      {
        method: "post",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((data) => data.data)
    .catch(() => console.warn("CatchOn: xAuth"));

  return `XBL3.0 x=${XSTS.DisplayClaims.xui[0].uhs};${XSTS.Token}`;
};
