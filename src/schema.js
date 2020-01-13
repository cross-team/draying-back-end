import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    drayings(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      first: Int
      last: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      before: String
      after: String
    ): DrayingConnection!
    driversCapacity(
      first: Int
      last: Int
      before: String
      after: String
    ): DriversCapacityConnection!
  }

  type DrayingConnection {
    pageInfo: PageInfo!
    edges: [DrayingEdge]
    nodes: [Draying]!
    totalCount: Int!
  }

  type DriversCapacityConnection {
    pageInfo: PageInfo!
    edges: [DriversCapacityEdge]
    nodes: [Driver]!
    totalCount: Int!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }

  type DrayingEdge {
    node: Node!
    cursor: String!
  }

  type DriversCapacityEdge {
    node: Node!
    cursor: String!
  }

  type Draying implements Node {
    id: ID!
    order: Order!
  }

  type Order implements Node {
    id: ID!
  }

  interface Node {
    id: ID!
  }

  type Route {
    id: ID!
  }

  type Driver implements Node {
    id: ID!
    firstName: String!
    lastName: String!
    active: Boolean!
    dailyWorkHours: Float!
    startDateTime: String
    endDateTime: String
    capacity: Float!
    trip: Trip
  }

  type Trip implements Node {
    id: ID!
    companyName: String!
    status: String!
    containerSize: String!
    containerType: String!
    shippingLine: String!
    locations: [Location]
  }

  type Location implements Node {
    id: ID!
    chassis: String
    booking: Booking
    container: Container
    state: LocationState
    enRouteAt: String
    arrivedAt: String
    completedAt: String
    skippedAt: String
    scheduledArrivalAt: String
    scheduledCompletedAt: String
    estimatedScheduledArrivalAt: String
    estimatedScheduledCompletedAt: String
    action: Action
    order: Order
    driver: Driver
    vehicle: Vehicle
    trip: Trip
    dispatchJob: DispatchJob
    estimatedWaitingTime: Int
    type: LocationType
    nickName: LocationNickName
    travelMiles: Float
    travelTime: Int
    estimatedTravelMiles: Float
    estimatedTravelTime: Int
    notes: String
    loadType: LoadType
    modifiedBy: String
    modifiedOn: String
    createdBy: String
    createdOn: String
  }

  type LocationState implements Node {
    id: ID!
  }
  type LocationType implements Node {
    id: ID!
  }
  type LocationNickName implements Node {
    id: ID!
  }

  type Booking implements Node {
    id: ID!
  }

  type Container implements Node {
    id: ID!
    size: String
  }

  type Action implements Node {
    id: ID!
    name: String
  }

  type LoadType implements Node {
    id: ID!
  }

  type Vehicle implements Node {
    id: ID!
  }

  type DispatchJob implements Node {
    id: ID!
  }

  type Mutation {
    login(user: LoginInput): LoginResponse!
  }

  input LoginInput {
    email: String!
    password: String!
    host: String!
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    token: String!
    email: String!
  }
`
export default typeDefs
