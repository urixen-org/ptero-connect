import { ApplicationApi, ClientApi, WebsocketApi } from "./index.ts";

const api = new ClientApi(
  "https://paid.zypher.cloud",
  "ptlc_a4yXElNUdhVb6irMqXBVNH4jgG2ixsoA8VMmdf0H3NZ",
  { debug: false }
);

const ws = new WebsocketApi(api); 

/*
const wsToken  = await ws.getToken("a9049bb7")
const socket = new WebSocket(wsToken.data.socket)
*/

const socket = await ws.connect("a9049bb7")
console.log(socket)
socket.addEventListener('open', event => {
  console.log('WebSocket connection established!');
  // Sends a message to the WebSocket server.
  socket.send('Hello Server!');
});
// Listen for messages and executes when a message is received from the server.
socket.addEventListener('message', event => {
  console.log('Message from server: ', event.data);
});
// Executes when the connection is closed, providing the close code and reason.
socket.addEventListener('close', event => {
  console.log('WebSocket connection closed:', event.code, event.reason);
});
// Executes if an error occurs during the WebSocket communication.
socket.addEventListener('error', error => {
  console.error('WebSocket error:', error);
});
/*
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


// ?  we can't see each other console??
// ? i am going to test zinox dash now i'll com e in 15 mins