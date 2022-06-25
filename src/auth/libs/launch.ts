import { BrowserWindow } from 'electron'
import { MicrosoftToken } from '../Auth.types'
import { MinecraftProfileTypes } from '../Mojang.types'
import getLibs from '.'

export async function launch(url: string, token: MicrosoftToken) {
  return new Promise<MinecraftProfileTypes>(async (resolve, reject) => {
    const { login } = getLibs(this.logger)
    const mainWindow = new BrowserWindow({
      width: 500,
      height: 650,
      resizable: false,
      title: 'Login with Microsoft Account'
    })
    mainWindow.setMenu(null)
    mainWindow.loadURL(url)
    const contents = mainWindow.webContents
    let loading = false

    mainWindow.on('close', () => {
      if (!loading) {
        reject(this.logger.error('Closed'))
      }
    })

    contents.on('did-finish-load', () => {
      const loc = contents.getURL()
      if (loc.startsWith(token.redirect)) {
        const urlParams = new URLSearchParams(
          loc.substring(loc.indexOf('?') + 1)
        ).get('code')

        if (urlParams) {
          loading = true
          mainWindow.hide()
          login(token, urlParams)
            .then((result) => {
              resolve(result)
              mainWindow.close()
            })
            .catch(() => {
              mainWindow.show()
              mainWindow.loadURL(url)
            })
          return urlParams
        }
      }
      return undefined
    })
  })
}
