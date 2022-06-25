import * as chalk from 'chalk'
import {
  LogFunctionTypes,
  LoggerCallbackFunction,
  LoggerCallBackTypes,
  LoggerTypes
} from './Logger.types'

export const LoggingColors = {
  error: 'bgRed',
  info: 'bgBlueBright',
  warn: 'bgYellow',
  log: 'bgGray'
}

export const LoggingCallback: LoggerCallbackFunction = (
  message: string,
  logType: 'error' | 'info' | 'warn' | 'log',
  callback?: LogFunctionTypes
) => {
  const tag = chalk[LoggingColors[logType]](`[${logType.toUpperCase()}]`)
  console[logType](`${tag}: ${message}`)
  if (callback) return callback(message)
}

export const Logger = (callback?: LoggerCallBackTypes): LoggerTypes => ({
  error: (message: string) =>
    LoggingCallback(message, 'error', callback?.onError),
  info: (message: string) => LoggingCallback(message, 'info', callback?.onInfo),
  warn: (message: string) => LoggingCallback(message, 'warn', callback?.onWarn),
  log: (message: string) => LoggingCallback(message, 'log', callback?.onLog)
})
