import express from 'express'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import routes from './routes'

const app = express()
const isDev = process.env.NODE_ENV !== 'production'
const port = 49162
const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: '*',
  optionsSuccessStatus: 200
}

if (isDev) {
  app.set('json spaces', 2)
  app.set('env', 'development')
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(':method :url :status (:response-time ms)'))
app.use(cors(corsOptions))

app.options('*', cors(corsOptions))

routes.forEach(({ route, handler }) => app.use(route, handler))

app.use('*', (_, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found'
  })
})

app.listen(port, () => {
  console.log('Server running')
})
