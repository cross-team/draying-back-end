import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema'
import resolvers from './resolvers'
import DrayingApi from './datasources/draying'
import DriverApi from './datasources/driver'
import LoginApi from './datasources/login'
import RouteApi from './datasources/route'
import TripApi from './datasources/trip'
import cookieParser from 'cookie-parser'
import QuoteApi from './datasources/quote'
import LookUpApi from './datasources/lookUp'
import ClientApi from './datasources/client'
import DeliveryLocationApi from './datasources/deliveryLocation'
import ExtraStopApi from './datasources/extraStop'

require('dotenv').config()

const dataSources = () => ({
  drayingApi: new DrayingApi(),
  loginApi: new LoginApi(),
  driverApi: new DriverApi(),
  routeApi: new RouteApi(),
  tripApi: new TripApi(),
  quoteApi: new QuoteApi(),
  lookUpApi: new LookUpApi(),
  clientApi: new ClientApi(),
  deliveryLocationApi: new DeliveryLocationApi(),
  extraStopApi: new ExtraStopApi(),
})

const port = process.env.PORT || 4000
const context = ({ req, res }) => {
  const { cookies } = req
  return {
    cookies,
    res,
  }
}

const server = new ApolloServer({
  typeDefs,
  dataSources,
  context,
  resolvers,
})
const app = express()

var whitelist = process.env.WHITE_LIST || [
  'http://localhost:8000',
  'http://localhost:4000',
  'http://localhost:4001',
]
const corsOptions = {
  origin: function(origin, callback) {
    console.log(`Orgin: ${origin}`)
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // <-- REQUIRED backend setting
}
app.use('*', cookieParser())

server.applyMiddleware({
  app,
  path: '/',
  cors: corsOptions,
})

if (process.env.NODE_ENV !== 'test') {
  app.get('/', function(req, res) {
    res.send(JSON.stringify({ Hello: 'World' }))
  })

  app.listen({ port }, () =>
    console.log(
      `🚀 app running at http://localhost:${port}${server.graphqlPath}`,
    ),
  )
}
export {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  server,
  DrayingApi,
  LoginApi,
}
