import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema'
import resolvers from './resolvers'
import DrayingApi from './datasources/draying'
import DriverApi from './datasources/driver'
import LoginApi from './datasources/login'
import cookieParser from 'cookie-parser'

require('dotenv').config()

const dataSources = () => ({
  drayingApi: new DrayingApi(),
  loginApi: new LoginApi(),
  driverApi: new DriverApi(),
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
