import { paginateResults } from './utils'

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
    login: async (_, { user: { email, password } }, { dataSources }) => {
      const loginResponse = await dataSources.loginApi.login({
        email,
        password,
      })
      return loginResponse
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
