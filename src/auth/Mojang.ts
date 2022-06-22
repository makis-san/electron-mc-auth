import { PromptTypes } from "./Mojang.types";
import { MicrosoftToken } from "./Auth.types";

export const MojangAuthToken = (prompt?: PromptTypes): MicrosoftToken => ({
  client_id: "00000000402b5328",
  redirect: "https://login.live.com/oauth20_desktop.srf",
  prompt: prompt,
});
