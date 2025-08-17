import {ClientApi, WebsocketApi} from "./index.ts"

const api = new ClientApi("https://paid.zypher.cloud", "ptlc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", {debug:true})

const ws = new WebsocketApi(api) // *   Hey index.ts has reached 2k Lines LOl

console.log(ws)
