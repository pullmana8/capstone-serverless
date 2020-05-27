// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'pq5sakqacj'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`
// https://pq5sakqacj.execute-api.us-east-2.amazonaws.com/dev/todos

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-r46n29lt.auth0.com',            // Auth0 domain
  clientId: 'MjwgFn2rodzKMiNNB1UIUG3yzJSIYrQt',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
