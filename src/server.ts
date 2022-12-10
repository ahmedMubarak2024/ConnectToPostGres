import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import articleRoutes from './handlers/MythicalWeponRoute'


const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

articleRoutes(app)


