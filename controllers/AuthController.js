const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const sha1 = require('sha1');
const uuidv4 = require('uuidv4');

const authController = {
  getConnect:  async (req, resp) =>{
    try{
      const header = req.headers['authorization'];
      if (!header || header.indexOf('Basic') !== 0) {
        resp.status(401).json({error: 'Unauthorized'});
      }
      const encodedHeaderValue = header.split(' ')[1]
      const decodedHeaderValue = Buffer.from(encodedHeaderValue);
      const [email, password] = decodedHeaderValue.split(':');
      const checkUser = await dbClient.makeRef.collection('user').findOne({email});
      if (!checkUser || checkUser.password !== sha1(password)){
        resp.status(401).json({error: 'Unauthorized'});
      }
      const token = uuidv4();
      const key = `auth_${token}`
      redisClient.set(key, checkUser.insertedId, 86400);
      resp.status(200).json({token});

    } catch (error){
      resp.status(401).json({error: 'Unauthorized'});
    }
  },
  getDisconnect: (req, resp) => {
    try{
      const token = req.headers['X-Token'];
      if (!token){
        resp.status(401).json({error: 'Unauthorized'});
        const deleted = redisClient.del(token)
        if (deleted){
          resp.status(204).json();
        }
    }
  }catch (error) {
    resp.status(401).json({error: 'Unauthorized'});
  }
 }
}


module.exports = authController;
