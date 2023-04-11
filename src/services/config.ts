import Constants from 'expo-constants';

const API_URL = Constants.manifest?.extra?.API_URL;
const API_VERSION = Constants.manifest?.extra?.API_VERSION;
const BASE_URL = 'https://prod01-edge-application-processing.azurewebsites.net';
const BASE_URL_NODE = 'https://prod01-edge-application-processing.azurewebsites.net';

const agoraTestConfig = {
  channelName: 'ntcedge',
  appId: '90bcc0f561a0427187789a4b0aed441a',
  token: '00690bcc0f561a0427187789a4b0aed441aIADbdwt6zaDdYuXRkLoNNsRcGry8cx68u/2YA7cBfChSbPamhlwAAAAAEADiSs2f48m5YQEAAQDjyblh',
}

export {
  BASE_URL,
  API_VERSION,
  BASE_URL_NODE,
  agoraTestConfig,
}
