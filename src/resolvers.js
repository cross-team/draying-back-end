import { paginateResults, fromCursorHash, pageInfoReducer } from './utils'
import jwt from 'jsonwebtoken'

export default {
  Query: {
    drayings: async (_, { before, after, first, last }, { dataSources }) => {
      const allDrayings = await dataSources.drayingApi.getAllDrayings()
      const drayings = paginateResults({
        before,
        after,
        first,
        last,
        results: allDrayings,
      })
      return pageInfoReducer(drayings, allDrayings)
    },
  },
  Mutation: {
    login: async (
      _,
      { user: { email = '', password, host } },
      { dataSources },
    ) => {
      const loginResponse = await dataSources.loginApi.login({
        email,
        password,
        host,
      })
      let token = ''
      if (loginResponse.success) {
        token = jwt.sign(
          {
            username: email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '30d', // token will expire in 30days
          },
        )
      }
      return { ...loginResponse, token, email }
    },
  },
  Draying: {
    order: draying => {
      return {
        id: draying.order,
      }
    },
  },
  Node: {
    __resolveType(node) {
      if (node.order) {
        return 'Draying'
      }

      return 'Route'
    },
  },
}
