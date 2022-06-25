import { BrowserWindow } from 'electron'
import { MinecraftProfileTypes } from '../Mojang.types'

export async function launch() {
  return new Promise<MinecraftProfileTypes>(async (resolve, reject) => {
    const { token, url } = this.getLink()
    const mainWindow = new BrowserWindow({
      width: 500,
      height: 650,
      resizable: false,
      title: 'Login with Microsoft Account'
    })

    mainWindow.webContents.openDevTools()
    mainWindow.setMenu(null)
    mainWindow.loadURL(url)
    const contents = mainWindow.webContents
    let loading = false

    mainWindow.on('close', () => {
      if (!loading) {
        reject(this.logger.error('Closed'))
      }
    })

    contents.on('did-finish-load', async () => {
      const loc = contents.getURL()
      if (loc.startsWith(token.redirect)) {
        const urlParams = new URLSearchParams(
          loc.substring(loc.indexOf('?') + 1)
        ).get('code')

        if (urlParams) {
          loading = true
          mainWindow.hide()
          const login = await this.login(token, urlParams)

          if (login) {
            resolve(login)
            return mainWindow.close()
          }
          mainWindow.show()
          mainWindow.loadURL(url)
          return urlParams
        } else {
          mainWindow.loadURL(url)
        }
      }
      return undefined
    })
  })
}
