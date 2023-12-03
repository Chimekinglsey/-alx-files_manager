const { createClient } = require('redis');
async function runRedis()  {

    const client = await createClient()
      .on('error', err => console.log('Redis Client Error', err))
      .connect();
    
    await client.set('key', 'value');
    const value = await client.get('key');
    console.log(`key set to: ${value}`)
    await client.disconnect();
}
runRedis()