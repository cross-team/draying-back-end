import { paginateResults } from './utils'
import jwt from 'jsonwebtoken'

export default {
  Query: {
    drayings: async (_, { after, pageSize }, { dataSources }) => {
      const allDrayings = await dataSources.drayingApi.getAllDrayings()
      const drayings = paginateResults({
        after,
        pageSize,
        results: allDrayings,
      })
      return {
        drayings,
        cursor: drayings.length ? drayings[drayings.length - 1].id : null,
        hasMore: drayings.length
          ? drayings[drayings.length - 1].id !==
            allDrayings[allDrayings.length - 1].id
          : false,
      }
    },
  },
  Mutation: {
    login: async (_, { user: { email = '', password } }, { dataSources }) => {
      const loginResponse = await dataSources.loginApi.login({
        email,
        password,
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
}
