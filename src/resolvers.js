import { paginateResults, pageInfoReducer } from './utils'
import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-express'

export default {
  Query: {
    containerTypes: async (_, __, { dataSources }) => {
      const containerTypes = await dataSources.lookUpApi.getContainerTypes()
      return containerTypes
    },
    containerSizes: async (_, __, { dataSources }) => {
      const containerSizes = await dataSources.lookUpApi.getContainerSizes()
      return containerSizes
    },
    costReasons: async (_, __, { dataSources }) => {
      const costReasons = await dataSources.lookUpApi.getCostReasons()
      return costReasons
    },
    costTypes: async (_, __, { dataSources }) => {
      const costTypes = await dataSources.lookUpApi.getCostTypes()
      return costTypes
    },
    client: async (_, { clientId }, { dataSources }) => {
      const client = await dataSources.clientApi.getClient({
        clientId,
      })
      return client
    },
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
    drayingTripDestinations: async (
      _,
      { drayingId, tripActionId, startLocationTypeId },
      { dataSources },
    ) => {
      const response = await dataSources.tripApi.drayingTripDestinations({
        drayingId,
        tripActionId,
        startLocationTypeId,
      })
      return response
    },
    drayingCheckContainerNumber: async (
      _,
      { drayingId, containerNumber },
      { dataSources },
    ) => {
      if (
        typeof drayingId === 'undefined' ||
        typeof containerNumber === 'undefined'
      ) {
        throw new ApolloError(`Must provide 'drayingId'`)
      }
      const response = await dataSources.drayingApi.checkContainerNumber({
        drayingId,
        containerNumber,
      })
      return response
    },
    drayingGetUndoTripActionMessage: async (
      _,
      { drayingId },
      { dataSources },
    ) => {
      if (typeof drayingId === 'undefined') {
        throw new ApolloError(`Must provide 'drayingId'.`)
      }
      const response = await dataSources.drayingApi.getUndoTripActionMessage({
        drayingId,
      })
      return response
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
    deliveryLocations: async (_, __, { dataSources }) => {
      const response = await dataSources.lookUpApi.getDeliveryLocations()
      return response
    },
    driverRoute: async (
      _,
      { driverId, fromDate, toDate, pending, orderBy },
      { dataSources },
    ) => {
      if (!fromDate || !toDate) {
        throw new ApolloError(`Must provide both 'fromDate' and 'toDate'`)
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
    quoteExtraStopPrices: async (
      _,
      { drayingId, deliveryLocationId },
      { dataSources },
    ) => {
      const response = await dataSources.quoteApi.extraStopPrices({
        drayingId,
        deliveryLocationId,
      })
      return response
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
    updateDraying: async (_, { drayingId, field, value }, { dataSources }) => {
      if (
        typeof drayingId === 'undefined' ||
        typeof field === 'undefined' ||
        typeof value === 'undefined'
      ) {
        throw new ApolloError(
          `Must provide 'drayingId', 'field' and 'value' together`,
        )
      }

      const updateResponse = await dataSources.drayingApi.updateDraying({
        drayingId,
        field,
        value,
      })
      return updateResponse
    },
    dispatchDraying: async (_, { trip }, { dataSources }) => {
      if (typeof trip === 'undefined') {
        throw new ApolloError(`Must provide 'trip'.`)
      }
      const reponse = await dataSources.routeApi.dispatchDraying({ trip })
      return reponse
    },
    undoDrayingTripAction: async (
      _,
      { drayingId, sendMessage = false, body = '' },
      { dataSources },
    ) => {
      if (typeof drayingId === 'undefined') {
        throw new ApolloError(`Must provide 'drayingId'.`)
      }
      const response = await dataSources.drayingApi.undoTripAction({
        drayingId,
        sendMessage,
        body,
      })
      return response
    },
    addDrayingExtraStop: async (
      _,
      { extraStopsAndPrices },
      { dataSources },
    ) => {
      const response = await dataSources.drayingApi.addExtraStop({
        extraStopsAndPrices,
      })
      return response
    },
    addDrayingAlert: async (
      _,
      { drayingId, dateFrom, description, active },
      { dataSources },
    ) => {
      const response = await dataSources.drayingApi.addAlert({
        drayingId,
        dateFrom,
        description,
        active,
      })
      return response
    },
    addDrayingAppointment: async (_, { appointment }, { dataSources }) => {
      const response = await dataSources.drayingApi.addAppointment({
        appointment,
      })
      return response
    },
    updateDrayingFields: async (
      _,
      { drayingId, drayingFields },
      { dataSources },
    ) => {
      const reponse = await dataSources.drayingApi.updateFields({
        drayingId,
        drayingFields,
      })
      return reponse
    },
    updateDrayingPickUpLocation: async (
      _,
      { drayingId, pickUpTerminalId },
      { dataSources },
    ) => {
      const reponse = await dataSources.drayingApi.updatePickUpTerminal({
        drayingId,
        pickUpTerminalId,
      })
      return reponse
    },
    updateDrayingReturnTerminal: async (
      _,
      { drayingId, returnTerminalId },
      { dataSources },
    ) => {
      const reponse = await dataSources.drayingApi.updateReturnTerminal({
        drayingId,
        returnTerminalId,
      })
      return reponse
    },
    setTripLost: async (
      _,
      { tripId, shipperCharges, driverPayment, companyCost },
      { dataSources },
    ) => {
      const reponse = await dataSources.tripApi.setLost({
        tripId,
        shipperCharges,
        driverPayment,
        companyCost,
      })
      return reponse
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
