import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    """
    Retrieve a list of all draryings
    """
    drayings(
      """
      Retrive the first n elements
      """
      first: Int
      """
      Retrieve teh last n elements
      """
      last: Int
      """
      Only return items before this cursor
      """
      before: String
      """
      Only return items after this cursor
      """
      after: String
    ): DrayingConnection!
    """
    Retrieve a list of drivers and their capacity for a certain date (today if none provided)
    """
    driversCapacity(
      """
      date to retrive capacity for
      """
      date: String
      """
      sort item in Ascending or decending order
      """
      sortASC: Boolean
      """
      Order by name or capacity
      """
      orderBy: OrderBy
      """
      Search for a driver name
      """
      driverName: String
      """
      Retrive the first n elements
      """
      first: Int
      """
      Retrieve teh last n elements
      """
      last: Int
      """
      Only return items before this cursor
      """
      before: String
      """
      Only return items after this cursor
      """
      after: String
    ): DriversCapacityConnection!
  }

  enum OrderBy {
    NAME
    CAPACITY
  }

  type DrayingConnection {
    """
    Information to aid in pagination.
    """
    pageInfo: PageInfo!
    """
    A list of Edges
    """
    edges: [DrayingEdge]
    """
    A list of Nodes
    """
    nodes: [Draying]!
    """
    Identifies the total count of items in the connection.
    """
    totalCount: Int!
  }

  type DriversCapacityConnection {
    """
    Information to aid in pagination.
    """
    pageInfo: PageInfo!
    """
    A list of Edges
    """
    edges: [DriversCapacityEdge]
    """
    A list of Nodes
    """
    nodes: [Driver]!
    """
    Identifies the total count of items in the connection.
    """
    totalCount: Int!
  }

  """
  Information about pagination in a connection.
  """
  type PageInfo {
    """
    When paginating forwards, the cursor to continue.
    """
    endCursor: String
    """
    When paginating forwards, are there more items?
    """
    hasNextPage: Boolean!
    """
    When paginating backwards, are there more items?
    """
    hasPreviousPage: Boolean!
    """
    When paginating backwards, the cursor to continue.
    """
    startCursor: String
  }

  type DrayingEdge {
    node: Draying!
    cursor: String!
  }

  type DriversCapacityEdge {
    node: Driver!
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
    """
    Is driver active and can be assinged trips
    """
    active: Boolean!
    """
    Hours worked daily by a driver, used to calucate how many hours available
    """
    dailyWorkHours: Float!
    """
    Date and time the driver starts the route for the day queried (default: today)
    """
    startDateTime: String
    """
    Date and time the driver ends the route for the day queried (default: today)
    """
    endDateTime: String
    """
    Percentage of capacity occupied
    """
    capacity: Float!
    """
    Current active trip not yet completed
    """
    trip: TripCapacity
    """
    Remaining trips for the date queried
    """
    pendingTripsCount: Int
  }

  type Trip implements Node {
    id: ID!
  }

  type TripCapacity implements Node { ### TripCapacity for current trip
    id: ID!
    companyName: String!
    """
    The trip's status (lost, dispatched, complete...)
    """
    status: String!
    containerSize: String!
    containerType: String!
    """
    Ocean shipping company
    """
    shippingLine: String!
    """
    Points on a trip
    """
    locations: [Location]
    """
    The route's timezone
    """
    timeZone: String
    timeZoneDstOffset: Int
    timeZoneRawOffset: Int
    """
    current time retrieved from truck
    """
    currentRouteTime: String
    """
    Date and time the trip was started
    """
    startTrip: String
    endTrip: String
    """
    Percent completed on current trip
    """
    progress: Int
    """
    Current active location
    """
    currentDestination: Location
    """

    """
    lastDestination: Location
  }

  type Location implements Node {
    id: ID!
    """
    The state of each location
        PENDING = 1,
        DISPATCH = 2, - Job dispatch
        ROUTE = 3,
        ARRIVAL = 4, - Arrived at location
        COMPLETED = 5, - Has left location
        SKIPPED = 6
    """
    state: LocationState
    """
    Date and time route started
    """
    enRouteAt: String
    """
    Date and time arrived at location (from GPS)
    """
    arrivedAt: String
    """
    Date and time left form location (form GPS)
    """
    completedAt: String
    """
    Date and time the Job was skipped
    """
    skippedAt: String
    """
    Date and time scheduled to arrive at set by the dispatcher
    """
    scheduledArrivalAt: String
    """
    Date and time scheduled to be completed set by the dispatcher
    """
    scheduledCompletedAt: String
    """
    Data and time scheduled to arrive calculated by the API
    """
    estimatedScheduledArrivalAt: String
    """
    Date and time scheduled to be completed calculated by the API
    """
    estimatedScheduledCompletedAt: String
    """
    Action being made at current location (load, unload, swap...)
    """
    action: Action
    order: Order
    driver: Driver
    vehicle: Vehicle
    trip: Trip

    """
    Time in minutes time between arrival and departure
    """
    estimatedWaitingTime: Int

    # type: LocationType
    """
    location object that returns nicknames and address attributes
    """
    nickName: LocationNickName
    """
    Miles traveled from previous location to the current one
    """
    travelMiles: Float
    """
    Time in minutes raveled from previous location to the current one
    """
    travelTime: Int
    """
    Estimated miles traveled from previous location to the current one
    that was calculated intially when the route was created
    """
    estimatedTravelMiles: Float
    """
    Estimated time traveled from previous location to the current one
    that was calculated intially when the route was created
    """
    estimatedTravelTime: Int
    """
    Important notes related to location
    """
    notes: String
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
    name: String
    partial: Boolean
    modifiedBy: String
    locationId: Int
    locStreet: String
    locSuite: String
    locCity: String
    locZip: Int
    locState: String
    locCountry: String
    googleAddress: String
    latitude: Float
    longitude: Float
  }

  type Booking implements Node {
    id: ID!
  }

  type Action implements Node {
    id: ID!
    name: String
  }

  type Vehicle implements Node {
    id: ID!
  }

  type DispatchJob implements Node {
    id: ID!
  }

  type Mutation {
    login(user: LoginInput): LoginResponse!
    sendResetPasswordEmail(user: SendResetPasswordEmailInput): LoginResponse!
    resetPassword(user: ResetPasswordInput): LoginResponse!
    changePassword(user: ChangePasswordInput): LoginResponse!
  }

  input LoginInput {
    email: String!
    password: String!
    host: String!
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    token: String
    email: String
  }

  input SendResetPasswordEmailInput {
    host: String!
    email: String!
  }

  input ResetPasswordInput {
    host: String!
    email: String!
    password: String!
    confirmPassword: String!
    userId: String!
    code: String!
  }
  input ChangePasswordInput {
    host: String!
    oldPassword: String!
    newPassword: String!
    confirmPassword: String!
  }
`
export default typeDefs
