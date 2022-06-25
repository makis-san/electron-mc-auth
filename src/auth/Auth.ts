import { Logger } from '../Logger/Logger'
import { LoggerCallBackTypes } from '../Logger/Logger.types'
import * as Libs from './libs'

type LibsTypes = typeof Libs

export default (
  logCallback: LoggerCallBackTypes = {
    onError: (message) => Error(message)
  }
) => {
  const logger = Logger(logCallback)
  const libs: LibsTypes = Object.keys(Libs).reduce(
    (acc: LibsTypes, cur: keyof LibsTypes) => ({
      ...acc,
      ...(typeof Libs[cur] === 'function'
        ? {
            [cur]: Libs[cur].bind({
              logger
            })
          }
        : { [cur]: Libs[cur] })
    }),
    {} as LibsTypes
  )
  const { url, token } = libs.getLink('select_account')
  return {
    ...libs,
    launch: () => libs.launch(url, token)
  }
}
