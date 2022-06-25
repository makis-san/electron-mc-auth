# electron-mc-auth

<div  align="center">
Display an electronJs window to authenticate Minecraft accounts through Xbox Live.

---

<div  style="display:flex;justify-content:center;text-align: center; margin-top:1.25rem;">
  <a href="https://www.npmjs.com/package/electron-mc-auth" targe="_BLANK">
    <img src="https://img.shields.io/npm/v/electron-mc-auth?style=for-the-badge" alt="version"/>
  </a>
  <img src="https://img.shields.io/github/license/makis-san/electron-mc-auth?style=for-the-badge" alt="license"/>
  <a href="https://ko-fi.com/F1F63DAEF" targe="_BLANK">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="ko-fi"/>
  </a>
</div> 
  
***
  
[Getting started](#getting-started) | [MCLC](#mclc) | [Contribuittions](/#)

</div>

# Getting started

Start by installing the package with your preffered package manager for node.

```shell
yarn add electron-mc-auth

or

npm install electron-mc-auth
```

## Setup

First of all, prefer to run the package code on the back-end side of the electron. So the documentation will only refer directly to the main.ts file.

### Auth()

To use the package authentication system, you need to instatiate the Auth function.

```ts
import { Auth } from 'electron-mc-auth'

const mcAuth = Auth()
```

This function should return an object containing all package functions with the predefined configuration passed on it initialization.

There are some functions that you can import directly, but, to start the auth flow, you should use launch() function that is returned by the Auth() function.

### Starting the auth flow

It's pretty straightfoward, just use the launch() function provided by the Auth() function and it will handle the Window creation and network requests to get you authenticated and reuturn the MinecraftProfile object.

Here's an example on the main file of electron.

```ts
// /main.ts

app.whenReady().then(() => {
  const authenticate = async () => {
    const auth = await Auth().launch()

    if (!auth) return

    console.log(auth)
    const refreshData = await refresh(auth)

    if (!refresh) return
    console.log('refresh', refreshData)

    dialog.showMessageBox({
      message: `
      Logged as: ${auth.name}
    `
    })

    return
  }
  authenticate()

  ...
})
```

## The Minecraft profile object

This is the most important part of the package.

If the login is succesful, you should recieve an object like this;

```ts
export interface MinecraftProfileTypes {
  id: string
  name: string
  skins: {
    id: string
    state: string
    url: string
    variant: string
  }[]
  capes: {
    id: string
    state: string
    url: string
    alias: string
  }[]
  access_token: string
  refresh_token: string
  client_token: string
  expires_in: number
}
```

### MCLC

Also, the package can convert its object to be compatible with [MCLC](https://www.npmjs.com/package/minecraft-launcher-core) package.

To do this, just pass your Minecraft Profile object to the getMCLC function.

```ts
function getMCLC(profile: MinecraftProfileTypes): MCLCAuthTypes
```

## Logging

You can pass your preffered callback for `onError`, `onInfo`, `onWarn`, `onLog` events

Example using default Auth() function.

```ts
const mcAuth = Auth({
  onError: (msg) => {
    return msg
  }
})
```

Example using Libs

```ts
const { refresh } = getLibs({
  onError: (msg) => {
    return msg
  }
})
```

Here's the type definition for the callback;

```ts
export type LogFunctionTypes = (message: string) => void

export interface LoggerCallBackTypes {
  onError?: LogFunctionTypes
  onInfo?: LogFunctionTypes
  onWarn?: LogFunctionTypes
  onLog?: LogFunctionTypes
}
```
