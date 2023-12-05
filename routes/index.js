import { app } from '../server'
import { appController } from '../controllers/AppController'

app.get('/status', appController.getStatus())
app.get('/stat', appController.getStats())
