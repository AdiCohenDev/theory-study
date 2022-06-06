import { Client } from 'pg';
const client = new Client();

(async () => {
  await client.connect();
})();

export default client;
