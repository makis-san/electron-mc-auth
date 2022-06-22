export type PromptTypes = "login" | "none" | "consent" | "select_account";

export interface MinecraftSkinTypes {
  id: string;
  state: string;
  url: string;
  variant: string;
}
export interface MinecraftCapeTypes {
  id: string;
  state: string;
  url: string;
  alias: string;
}
export interface MinecraftProfileTypes {
  id: string;
  name: string;
  skins: MinecraftSkinTypes[];
  capes: MinecraftCapeTypes[];
  access_token: string;
  client_token;
}

export interface MCLCAuthTypes {
  access_token: string;
  client_token: string;
  uuid: string;
  name: string;
  meta: {
    type: "msa";
    demo: false;
  };
}
