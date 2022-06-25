import { Logger } from '../Logger/Logger'
import { LoggerCallBackTypes } from '../Logger/Logger.types'
import * as LIBS from './libs'

type LibsTypes = typeof LIBS

export default (
  logCallback: LoggerCallBackTypes = {
    onError: (message) => Error(message)
  }
): LibsTypes => {
  const logger = Logger(logCallback)

  return Object.keys(LIBS).reduce(
    (acc: LibsTypes, cur: keyof LibsTypes) => ({
      ...acc,
      ...(typeof LIBS[cur] === 'function'
        ? {
            [cur]: LIBS[cur].bind({ logger, ...LIBS })
          }
        : { [cur]: LIBS[cur] })
    }),
    {} as LibsTypes
  )
}
