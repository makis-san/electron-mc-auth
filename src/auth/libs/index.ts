import { Logger } from '../../Logger/Logger'
import { LoggerCallBackTypes } from '../../Logger/Logger.types'
import { getLink } from './getLink'
import { login } from './login'
import { getMCLC } from './mclc/getMCLC'
import { xAuth } from './xbox/xBoxAuth'
import { refresh } from './refresh'
import { validate } from './validate'
import { getMinecraft } from './getMinecraft'
import { launch } from './launch'

const LIBS = {
  getLink,
  login,
  getMCLC,
  xAuth,
  validate,
  getMinecraft,
  refresh,
  launch
}
type LibsTypes = typeof LIBS

export default (LoggerCallBack?: LoggerCallBackTypes) => {
  const logger = Logger(LoggerCallBack)

  return Object.keys(LIBS).reduce(
    (acc: LibsTypes, cur: keyof LibsTypes) => ({
      ...acc,
      ...(typeof LIBS[cur] === 'function'
        ? {
            [cur]: LIBS[cur].bind({ logger })
          }
        : { [cur]: LIBS[cur] })
    }),
    {} as LibsTypes
  )
}
