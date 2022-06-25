export type LogFunctionTypes = (message: string) => void

export interface LoggerPropTypes {
  onLog?: LogFunctionTypes
  onError?: LogFunctionTypes
  onWarn?: LogFunctionTypes
  onInfo?: LogFunctionTypes
}

export interface LoggerCallBackTypes {
  onError?: LogFunctionTypes
  onInfo?: LogFunctionTypes
  onWarn?: LogFunctionTypes
  onLog?: LogFunctionTypes
}
export type LoggerCallbackFunction = (
  message: string,
  logType: 'error' | 'info' | 'warn' | 'log',
  callback?: LogFunctionTypes
) => void | LoggerCallbackFunction

export interface LoggerTypes {
  error: (message: string) => LoggerCallbackFunction | void
  info: (message: string) => LoggerCallbackFunction | void
  warn: (message: string) => LoggerCallbackFunction | void
  log: (message: string) => LoggerCallbackFunction | void
}
