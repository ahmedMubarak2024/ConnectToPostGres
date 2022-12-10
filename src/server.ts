import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import weaponsRoutes from './handlers/MythicalWeponRoute'
import userIdentityRoutes from './handlers/UserIdentityRoute'


const app: express.Application = express()
const address: string = "0.0.0.0:8085"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(8080, function () {
    console.log(`starting app on: ${address}`)
})

weaponsRoutes(app)
userIdentityRoutes(app)


