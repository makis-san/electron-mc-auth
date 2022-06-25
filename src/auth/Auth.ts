import { Logger } from '../Logger/Logger'
import { LoggerCallBackTypes } from '../Logger/Logger.types'
import Libs from './libs'

type LibsTypes = typeof Libs

export default (
  logCallback: LoggerCallBackTypes = {
    onError: (message) => Error(message)
  }
) => {
  const libs = Libs(logCallback)

  const { url, token } = libs.getLink('select_account')
  return {
    ...libs,
    launch: () => libs.launch(url, token)
  }
}
