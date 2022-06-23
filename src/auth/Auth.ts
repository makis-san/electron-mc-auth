import axios from "axios";
import { BrowserWindow } from "electron";
import * as Auth from "./libs";
import { MinecraftProfileTypes } from "./Mojang.types";

export default async () => {
  const { url, token } = Auth.getLink("select_account");
  return await new Promise<MinecraftProfileTypes>(async (resolve, reject) => {
    const mainWindow = new BrowserWindow({
      width: 500,
      height: 650,
      resizable: false,
      title: "Login with Microsoft Account",
    });
    mainWindow.setMenu(null);
    mainWindow.loadURL(url);
    const contents = mainWindow.webContents;
    var loading = false;
    mainWindow.on("close", () => {
      if (!loading) {
        reject("error.gui.closed");
      }
    });
    contents.on("did-finish-load", () => {
      const loc = contents.getURL();
      if (loc.startsWith(token.redirect)) {
        const urlParams = new URLSearchParams(
          loc.substr(loc.indexOf("?") + 1)
        ).get("code");
        if (urlParams) {
          mainWindow.close();
          Auth.login(token, urlParams).then((result) => {
            resolve(result);
          });
          loading = true;
          return urlParams;
        }
        try {
          mainWindow.close();
        } catch {
          console.error("[MC-AUTH]: Failed to close window!");
        }
      }
    });
  });
  return;
};
