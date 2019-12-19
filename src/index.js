import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema'
import resolvers from './resolvers'
import DrayingApi from './datasources/draying'
import LoginApi from './datasources/login'
import cookieParser from 'cookie-parser'

require('dotenv').config()

const dataSources = () => ({
  drayingApi: new DrayingApi(),
  loginApi: new LoginApi(),
})

const PORT = 4000
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
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  credentials: true, // <-- REQUIRED backend setting
}
app.use('*', cookieParser())
server.applyMiddleware({
  app,
  path: '/graphql',
  cors: corsOptions,
})

if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 app running at http://localhost:${PORT}${server.graphqlPath}`,
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
