
import * as crypto from 'crypto';
import axios from 'axios';
const fs = require('fs');
const config = require('./config');
const path = './token.json';


const httpClient = axios.create({ 
  baseURL: config.host,
  timeout: 5000,
});

let token = '';
let tokenExpiry = 0; // Store expiration time as a timestamp (in milliseconds)

async function getToken() {
  const method = 'GET';
  const timestamp = Date.now().toString();
  const signUrl = '/v1.0/token?grant_type=1';
  const contentHash = crypto.createHash('sha256').update('').digest('hex');
  const stringToSign = [method, contentHash, '', signUrl].join('\n');
  const signStr = config.accessKey + timestamp + stringToSign;

  const headers = {
    t: timestamp,
    sign_method: 'HMAC-SHA256',
    client_id: config.accessKey,
    sign: await encryptStr(signStr, config.secretKey),
  };

  const { data: login } = await httpClient.get('/v1.0/token?grant_type=1', { headers });
  if (!login || !login.success) {
    throw new Error(`fetch failed: ${login.msg}`);
  }
  token = login.result.access_token;
  tokenExpiry = Date.now() + 7200 * 1000; // Set the token to expire in 7200 seconds (2 hours)
  
  // Save the token to a file
  await saveToken(token, tokenExpiry);
}

async function controlDevice(deviceId: string, command: boolean) {

  //Load the token 
  await loadToken();

  // Check if the token is still valid
  if (!token || Date.now() >= tokenExpiry) {
    console.log('Token expired or not found, fetching a new one...');
    await getToken();
  } else {
    console.log('Using cached token...');
  }

  const method = 'POST';
  const timestamp = Date.now().toString();
  const url = `/v1.0/devices/${deviceId}/commands`;
  const data = JSON.stringify({
    commands: [
      { code: 'switch_led', value: command }
    ],
  });
  const contentHash = crypto.createHash('sha256').update(data).digest('hex');
  const stringToSign = [method, contentHash, '', url].join('\n');
  const signStr = config.accessKey + token + timestamp + stringToSign;

  const headers = {
    t: timestamp,
    client_id: config.accessKey,
    sign_method: 'HMAC-SHA256',
    access_token: token,
    sign: await encryptStr(signStr, config.secretKey),
    'Content-Type': 'application/json',
  };

  const { data: response } = await httpClient.post(url, data, { headers });
  console.log('Device control response:', response);
}

//Export the controlDevice Module
module.exports = { controlDevice };

async function encryptStr(str: string, secret: string): Promise<string> {
  return crypto.createHmac('sha256', secret).update(str, 'utf8').digest('hex').toUpperCase();
}

async function saveToken(token: string, expiry: number) {

  try{
    const data = JSON.stringify({ token, expiry });
    fs.writeFileSync(path, data, 'utf8');
    console.log('Token Saved Successfully');
  } catch(error){
    if(error instanceof Error){
      console.log('Error Saving Token', error.message)
    } else{
      console.log('Unknown error has occured while attempting to save the token....')
    }
  }
  
}

async function loadToken() {
  try{
    if (fs.existsSync(path)) {
      const data = fs.readFileSync(path, 'utf8');
      const { token: savedToken, expiry } = JSON.parse(data);
      token = savedToken;
      tokenExpiry = expiry;
      console.log('Token Loaded Successfully');
    }

  } catch(error){
    if(error instanceof Error) {
      console.log('There was an error loading the access token', error.message);
    } else{
      console.log('Unknown error has occured while attempting to load the token....')
    }
  }
  
}


