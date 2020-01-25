import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { execute, toPromise } from 'apollo-link'
import express from 'express'

import {
  context as defaultContext,
  typeDefs,
  resolvers,
  ApolloServer,
  DrayingAPI,
  LoginAPI,
  corsOptions,
} from '../'

/**
 * Integration testing utils
 */
const constructTestServer = ({ context = defaultContext } = {}) => {
  const userAPI = new LoginAPI()
  const launchAPI = new DrayingAPI()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ userAPI, launchAPI }),
    context,
  })

  return { server, userAPI, launchAPI }
}

/**
 * e2e Testing Utils
 */

const startTestServer = async server => {
  // if using apollo-server-express...
  const app = express()
  server.applyMiddleware({
    app,
    path: '/',
    cors: corsOptions,
  })
  const httpServer = await app.listen(5000)

  const link = new HttpLink({
    uri: `http://localhost:${5000}`,
    fetch,
    credentials: 'include',
    headers: [],
  })

  const executeOperation = ({ query, variables = {} }) => {
    return execute(link, { query, variables })
  }

  return {
    link,
    stop: () => (httpServer.server ? httpServer.server.close() : {}),
    graphql: executeOperation,
  }
}

export { toPromise, constructTestServer, startTestServer }
