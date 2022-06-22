import { PromptTypes } from "./Mojang.types";

export interface MicrosoftToken {
  client_id: string;
  redirect: string;
  clientSecret?: string;
  prompt?: PromptTypes;
}

export interface MicrosoftAuthToken {
  token_type: string;
  expires_in: number;
  scope: string;
  access_token: string;
  refresh_token: string;
  user_id: string;
  foci: string;
}
