import { redisClient } from '../utils/redis'
import { dbClient } from '../utils/db'

const appController = {getStatus: (req, resp)=>{
    try {
        const redisStatus = redisClient.isAlive()
        const dbStatus = dbClient.isAlive()
        res.status(200).json({ redis: redisStatus, db: dbStatus });    }
    catch(err){
        resp.status(500).json({error: err})
}
}, getStats: (req, resp)=>{
    try {
        const dbUsers = redisClient.nbUsers()
        const dbFiles = dbClient.nbFiles()
        resp.status(200).json({ user: dbUsers, files: dbFiles });
    }
    catch(err){
        resp.status(500).json({error: err})
    }
    }
}
module.exports = appController;