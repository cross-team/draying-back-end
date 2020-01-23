import { paginateResults, pageInfoReducer } from './utils'
import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-express'

export default {
  Query: {
    drayings: async (
      _,
      {
        containerStages,
        containerTypes,
        currentLocationTypes,
        inMovement,
        routeDriverId,
        routeDate,
        sort,
        orderBy,
        before,
        after,
        first,
        last,
      },
      { dataSources },
    ) => {
      if ((!!routeDriverId && !routeDate) || (!routeDriverId && !!routeDate)) {
        throw new ApolloError(
          `Must provide 'routeDriverId' and 'routeDate' together`,
        )
      }
      const allDrayings = await dataSources.drayingApi.getAllDrayings({
        containerStages,
        containerTypes,
        currentLocationTypes,
        inMovement,
        routeDriverId,
        routeDate,
        sort,
        orderBy,
      })
      const drayings = paginateResults({
        before,
        after,
        first,
        last,
        results: allDrayings,
      })
      return pageInfoReducer(drayings, allDrayings)
    },
    draying: async (_, { drayingId }, { dataSources }) => {
      if (typeof drayingId === 'undefined') {
        throw new ApolloError(`Must provide 'drayingId'`)
      }
      const draying = await dataSources.drayingApi.getDeliveryOrderDraying({
        drayingId,
      })
      return draying
    },
    drayingNextActions: async (_, { drayingId, tripId }, { dataSources }) => {
      if (typeof drayingId === 'undefined') {
        throw new ApolloError(`Must provide 'drayingId'`)
      }
      const drayingNextActions = await dataSources.drayingApi.getDrayingNextActions(
        { drayingId, tripId },
      )
      return drayingNextActions
    },
    driversCapacity: async (
      _,
      { date, orderBy, sortAsc, driverName, before, after, first, last },
      { dataSources },
    ) => {
      const allDrivers = await dataSources.driverApi.getDriversCapacity({
        date,
        orderBy,
        sortAsc,
        driverName,
      })
      const drivers = paginateResults({
        before,
        after,
        first,
        last,
        results: allDrivers,
      })
      return pageInfoReducer(drivers, allDrivers)
    },
    driverRoute: async (
      _,
      { driverId, fromDate, toDate, pending, orderBy },
      { dataSources },
    ) => {
      if (!fromDate || !toDate) {
        throw new ApolloError(`Must provide either 'fromDate' and 'toDate'`)
      }
      const route = await dataSources.routeApi.getDriverRoute({
        driverId,
        fromDate,
        toDate,
        pending,
        orderBy,
      })
      return route
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
  Node: {
    __resolveType(node) {
      if (node.order) {
        return 'Draying'
      }

      return 'Route'
    },
  },
}
