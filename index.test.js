import {ClientApi, WebsocketApi} from "./index.ts"

const api = new ClientApi("https://paid.zypher.cloud", "ptlc_IIgBz2Qq9jaESkI3t1WVYWJY0vRK29TkpQoGCZv2iay", {debug:true})

const ws = new WebsocketApi(api) // *   Hey index.ts has reached 2k Lines LOl

console.log(ws)

/**
* *  WebsocketApi {
* *   clientApi: ClientApi {
* *     panelUrl: 'https://paid.zypher.cloud',
* *     clientKey: 'ptlc_IIgBz2Qq9jaESkI3t1WVYWJY0vRK29TkpQoGCZv2iay',
* *     headers: {
* *       Accept: 'application/json',
* *       Authorization: 'Bearer ptlc_IIgBz2Qq9jaESkI3t1WVYWJY0vRK29TkpQoGCZv2iay',
* *       'Content-Type': 'application/json'
* *     },
* *     debug: true
* *   }
* * }
 */