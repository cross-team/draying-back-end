import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema'
import resolvers from './resolvers'
import DrayingApi from './datasources/draying'
import LoginApi from './datasources/login'
import cookieParser from 'cookie-parser'

const dataSources = () => ({
  drayingApi: new DrayingApi(),
  loginApi: new LoginApi(),
})

const PORT = 4000
const context = ({ req, res }) => {
  const { cookies = '' } = req
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
app.use('*', cookieParser())

server.applyMiddleware({
  app,
  path: '/',
})

if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 app running at http://localhost:${PORT}${server.graphqlPath}`,
    ),
  )
}
