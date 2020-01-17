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
      date to retrive capacity for example -"1/13/2020"
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
    """
    Returns trips for a certain driver for a certain day, today if no day is provided.
    If today is provided or no date is provided, then it returns all pending trips
    past, present, or future
    """
    driverRoute(
      """
      Id of the driver to retrieve the route for (required)
      """
      driverId: String
      """
      If today is provided or no date is provided, then it returns all pending trips
      past, present, or future
      """
      fromDate: String
      """

      """
      toDate: String
      pending: Boolean
      orderBy: OrderBy
    ): [Route]!
  }

  enum OrderBy {
    NAME
    CAPACITY
  }

  type DrayingAppointment implements Node {
    id: ID!
  }

  type Booking implements Node {
    id: ID!
  }

  type Carrier implements Node {
    id: ID!
  }

  type Client implements Node {
    id: ID!
    companyName: String
    note: String
    isActive: Boolean
    clientTypeId: Int
    clientCode: String
    """
    "0001-01-01T00:00:00",
    """
    createdOn: String
    createdBy: Int
    active: Boolean
    modifiedBy: Int
    modifiedOn: String
    legalName: String
    EIN: String
    locationAddressId: Int
    billingAddressId: Int
    termId: Int
    clientPriorityId: Int
    invoiceEmails: String
    notificationEmails: String
    companyId: Int
    companyRelatedId: Int
    clientOrderTemplateId: Int
    deliveryOrder: [Int]
    quotes: [Int]
    clientContacts: [Contact]
  }
  type Contact implements Node {
    id: ID!
  }

  type ContainerSize implements Node {
    id: ID!
    name: String
    size: Int
  }

  type ContainerType implements Node {
    id: ID!
    name: String
    shortName: String
    order: Int
    active: Boolean
  }

  type ContainerStage implements Node {
    id: ID!
  }

  type Cost implements Node {
    id: ID!
    type: String
    reason: String
  }

  type DeliveryLocation implements Node {
    id: ID!
    location: Location
    isDefault: Boolean
    active: Boolean
    locationType: LocationType
    receivingHoursOpen: String
    receivingHoursClose: String
    nickName: LocationNickName
    partial: Boolean
    deliveryContacts: [Contact]
    deliveryOrders: [String]
    drayings: [Draying]
    locStreet: String
    locSuite: String
    locCity: String
    locZip: String
    locState: String
    locCountry: String
    googleAddress: String
    latitude: Float
    longitude: Float
  }

  """
  A container
  """
  type Draying implements Node {
    id: ID!
    order: Order
    client: Client
    DeliveryLocation: DeliveryLocation
    """
    Booking ID
    """
    booking: String
    """
    Contianer name
    """
    container: String
    containerSize: String
    containerType: String
    """
    Estimated date and time container is availble
    """
    estimateAvailableOn: String
    """
    Last possible day the container is free of charge while at port
    """
    lastFreeDay: String
    """
    Days after adquieried cotainers to return of the pull date
    """
    daysToReturn: String
    """
    Last possible day to return
    """
    lastDayToReturn: String
    """
    Does the container have a hold
    """
    holds: Boolean
    """
    Estimated date and time container is availble
    """
    line: String

    feesDues: Float
    feesPaid: Float
    preGate: String
    yardLocation: String
    yardStatus: String
    loadEmpty: Boolean
    """
    The container's weight
    """
    weight: Float
    """
    Information about dimensions
    """
    overDimension: String
    """
    Hazmat description
    """
    hazmat: String
    """
    Information about the vessel
    """
    voyageCode: String
    """
    Information about the vessel
    """
    lloydsNo: String
    """
    Information about the vessel
    """
    vesselName: String
    """
    Date and time estimated discharge
    """
    estimateDischarge: String
    """
    container stages (review, completed, )
    """
    stage: ContainerStage
    """
    Carrier code (Standard carrier code)
    """
    SCAC: String
    """
    Earliest date the container can be returned
    """
    earlyReturnDate: String
    createdOn: String
    createdBy: Int
    modifiedOn: String
    modifiedBy: Int
    """
    Main price depending on live or drop (set by dispatcher)
    """
    price: Float
    """
    Price suggested for live or drop (calculated by the API)
    """
    priceSuggested: Float
    """
    Day requested by client the container be stored
    """
    daysStorage: Int
    """
    Is the container planned as live or drop
    """
    isLive: Boolean
    """
    Has the client request the container to be pre-pulled
    """
    prePull: Boolean
    """
    Before returning to port, does the container need to be returned to the
    yard (planificaiton stage)
    """
    yardStop: Boolean
    """
    When sharing chassis between trucking companies
    """
    chassisSplit: Boolean
    """
    Is the container urgent? Marked by dispatcher
    """
    urgent: Boolean
    """
    Container needs an appointment or not
    """
    appointmentNeeded: Boolean
    """
    Date the appointment set for
    """
    appointmentDate: String
    """
    Estimate time available for pickup
    """
    estimateDeliverTimeFrom: String
    """
    Estimate time available for delivery
    """
    estimateDeliverTimeTo: String
    """
    Container is not available, at the time, but it will be pickup anyway is
    this is set to true
    """
    notReleasedPull: Boolean
    """
    Estimate time available for pickup
    """
    terminalLocation: TerminalLocation
    """
    Is the container overweight or not
    """
    overweight: Boolean
    """
    Is the container over dimension or not
    """
    isOverDimension: Boolean
    """
    Available at the port
    """
    available: Boolean
    """
    Is the container over hazmat or not
    """
    isHazmat: Boolean
    """
    Estimate Date available for delivery
    """
    estimatedDeliveryDateFrom: String
    """
    Estimate date available for delivery
    """
    estimatedDeliveryDateTo: String
    """
    For exports, last possible date to deliver to port
    """
    cutOffDate: String
    """
    Container status (hold, avialble, returned...)
    """
    portStatus: PortStatus
    """
    The container can not be dispatched
    """
    dontDispatch: Boolean
    """
    Import/export from lookup table
    """
    loadType: LoadType
    """
    Shiping company
    """
    shippingLine: ShippingLine
    """
    Total estimated miles the container will travel
    """
    estimateTotalMilesRoundTrip: Int
    """
    Time in minutes for the the round trip
    """
    estimateTotalTimeRoundTrip: Int
    """
    Number between > 0 which represents the priority, the greater the number, the higher the priority
    """
    priority: Float
    """
    Last day possible to retrieve container
    """
    lastDayToPull: String
    """
    Date on which the container was retrieved
    """
    pullDay: String
    """
    Estimations for priorities and appointments
    """
    specificAppoinmentPickUpFromClient: Boolean
    pickUpClientDateFrom: String
    pickUpClientDateTo: String
    pickUpClientTimeFrom: String
    pickUpClientTimeTo: String
    """
    location types (Depot, yard, Yard)
    """
    currentLocationType: LocationType
    """
    Last possible day to deliver to client
    """
    lastDayToDeliverToClient: String
    """
    Prority between 0-5
    """
    dispatchingPriority: Float
    """
    Has the terminal been marked as manual (does not have web page)
    """
    manualTerminal: Boolean
    """
    Has the information been loaded, by scapping, from automatically for the container
    """
    autoLoad: Boolean
    """
    Time the appointment
    """
    appointmentTime: String

    deliveryOrder: Order
    appointments: [DrayingAppointment]
    trips: [Trip]
    drayingAlerts: [DrayingAlert]
    """
    Round trips for this container
    """
    drayingRoundTrips: [DrayingRoundTrips]
    """
    Information from port
    """
    seal: String
    """
    Information from port
    """
    customsStatus: String
    """
    Information from port
    """
    lineStatus: String
    """
    Information from port
    """
    lastGateMoveStatus: String
    """
    Information from port
    """
    lastGateDateTime: String
    """
    Information from port
    """
    isLoaded: Boolean
    """
    Indicates if a street turn (for imports) and extra movement
    """
    streetTurn: Boolean
    """
    Location type id where the street turn start (client or yard)
    """
    startLocationStreetTurnId: Int
    """
    Container (for export) has recieved a street turned container
    """
    originStreetTurnDrayingId: Int
    """
    Location specific where the container is started
    """
    originStreetTurnLocationNickName: LocationNickName
    """
    Return terminal
    """
    returnTerminal: TerminalLocation
    """
    Date returned
    """
    returnDate: String
    """
    Date completed
    """
    completedDate: String
    """
    Estimated last date and time to be delivered live
    """
    lastDateTimeToDeliverLive: String
    """
    Estimated last date and time to be delivered for drop
    """
    lastDateTimeToDeliverDrop: String
    """
    Last date the container can be delivered live
    """
    latestDeliveryDateTimeLive: String
    """
    Last date the container can be delivered for drop
    """
    latestDeliveryDateTimeDrop: String
    """
    Last date the container can be picked up
    """
    latestPickDateTime: String
    """
    Last time the container can be pulled
    """
    latestPullDateTime: String
    """
    The first day the container was available
    """
    availableDay: String
    """
    Was the street turn ignored
    """
    streetTurnMuted: Boolean
    """
    Was reviewed by accounting
    """
    reviewed: Boolean
    """
    Was there an invoice created
    """
    invoiced: Boolean
    """
    Has a special license (customs)
    """
    bonded: Boolean
    """
    Last date the container can be delivered
    """
    carrier: Carrier
  }

  type DrayingAlert implements Node {
    id: ID!
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
  type DriversCapacityEdge {
    node: Driver!
    cursor: String!
  }

  type DrayingRoundTrips implements Node {
    id: ID!
  }

  type DrayingEdge {
    node: Draying!
    cursor: String!
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

    phone: String
    defaultStartingHoS: String
    userName: String
    licenseNumber: String
    licenseState: String
    eldExempt: String
    eldExemptReason: String
    eldBigDayExemptionEnabled: Boolean
    eldAdverseWeatherExemptionEnabled: Boolean
    eldPcEnabled: Boolean
    eldYmEnabled: Boolean
    eldDayStartHour: String
    vehicle: Vehicle
    isDeactivated: Boolean
    driverUserId: Int
    saturdayShift: Boolean
    weeklyWorkHours: Float
    workRadius: Int
    baseWeeklySalary: Float
    salaryPerMile: Float
    salaryPerTripDelivered: Float
    defaultYard: LocationNickName
    homeAddress: LocationNickName
    defaultVehicle: Vehicle
    ownerOperator: Boolean
    modifiedBy: Int
    modifiedOn: String
    createdBy: Int
    createdOn: String
    carrier: Carrier
    eLDTokenCarrierId: Int
    isSmartTrucking: Boolean
    companyId: Int
  }

  ## extra delivery locations, links between different locations
  type ExtraStops implements Node {
    id: ID!
    draying: Draying
    """
    Address information about a company
    """
    deliveryLocation: DeliveryLocation
    order: Order
    status: TripStatus
    createdOn: String
    createdBy: String
    modifiedOn: String
    modifiedBy: String
  }

  type LoadType implements Node {
    id: ID!
    name: String
    shortName: String
  }

  type Location implements Node {
    id: ID!
    nickName: LocationNickName
    preferred: Boolean
    partial: Boolean
    contactName: String
    contactPhone: String
    modifiedBy: Int
    locStreet: String
    locSuite: String
    locCity: String
    locZip: String
    locState: String
    locCountry: String
    googleAddress: String
    latitude: Float
    longitude: Float
  }

  type LocationState implements Node {
    id: ID!
    name: String
    shortName: String
    active: Boolean
  }
  type LocationType implements Node {
    id: ID!
    name: String
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

  interface Node {
    id: ID!
  }

  type Order implements Node {
    id: ID!
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

  type PortStatus implements Node {
    id: ID!
    name: String
    shortName: String
    order: Int
    active: Boolean
  }

  """
  Returns information about trips for a certain driver on a certain date
  """
  type Route implements Node {
    id: ID!
    driver: Driver
    vehicle: Vehicle
    """
    Reference to external route on GPS
    """
    externalRouteId: String
    """
    Reference to external group on GPS
    """
    extarnalGroupId: String
    """
    Route name (date by default)
    """
    name: String
    """
    Date and time route is scheduled to start on that day
    """
    scheduledStartDateTime: String
    """
    Reference to external route on GPS
    """
    scheduledEndDateTime: String
    startLocationNickName: LocationNickName
    timeZone: String
    timeZoneDstOffset: Int
    timeZoneRawOffset: Int
    """
    Start Date and time set by GPS
    """
    startDateTime: String
    """
    End Date and time set by GPS
    """
    endDateTime: String
    """
    Is route editable
    """
    isEditable: Boolean
    modifiedBy: Int
    modifiedOn: String
    createdBy: Int
    createdOn: String
    trips: [Trip]
  }

  type Trip {
    id: ID!
    """
    Action being made at current location (load, unload, swap, pre-pull...)
    """
    action: TripAction
    """
    The trip's current status (In movement, dispatched, completed...)
    """
    status: TripStatus
    """

    """
    order: Order
    """

    """
    modifiedBy: String
    """

    """
    modifiedOn: String
    """

    """
    createdBy: Int
    """

    """
    createdOn: String
    """
    Trip's order
    """
    orderRoute: Order
    """
    Driver
    """
    driver: Driver
    """

    """
    actionLocation: TripActionLocation
    """
    Trip needs to be paid by client?
    """
    paidByClient: Boolean
    """
    (yard, cliente, etc...)
    """
    startLocationType: LocationType
    """
    (yard, cliente, etc...)
    """
    endLocationTypeId: LocationType
    """
    When trip starts, is the container loaded or not
    """
    containerLoadedStart: Boolean
    """
    When trip ends, is the container loaded or not
    """
    containerLoadedEnd: Boolean
    """
    Route to which trip is assigned
    """
    route: Route
    """

    """
    externalRouteId: String
    """
    Container
    """
    draying: Draying
    """
    extras stops for the trip
    """
    extraStops: [ExtraStops]
    """
    additinal costs add to trip, return when queries container by id
    """
    costs: [Cost]
    """
    Message send to drivers (sms)
    """
    messages: [TripMessage]
    """
    Location on the trip
    """
    locations: [TripLocation]
  }

  type ShippingLine implements Node {
    id: ID!
    name: String
    shortName: String
    url: String
    active: Boolean
  }

  """
  Location object with information specific to a  terminal
  """
  type TerminalLocation implements Node {
    id: ID!
    location: Location
    shortName: String
    isDefault: Boolean
    active: Boolean
    locationType: LocationType
    radius: String
    modifiedBy: Int
    modifiedOn: String
    autoLoad: Boolean
    nickName: String
    isTerminal: Boolean
    isDeport: Boolean
    drayingTimeActionTerminals: String
    terminalLocationHours: String
    locStreet: String
    locSuite: String
    locCity: String
    locZip: String
    locState: String
    locCountry: String
    googleAddress: String
    latitude: Float
    longitude: Float
  }

  type TripActionLocation implements Node {
    id: ID!
  }

  type TripMessage implements Node {
    id: ID!
  }

  type TripStatus implements Node {
    id: ID!
    name: String
    order: Order
    status: Boolean
  }

  type TripAction implements Node {
    id: ID!
    name: String
    shortName: String
    active: Boolean
  }
  """
  Information about the trip and it's capacity
  """
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
    locations: [TripLocation]
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
    currentDestination: TripLocation
    """

    """
    lastDestination: TripLocation
  }

  """
  Location information specific for the a trip's capacity calculations
  """
  type TripLocation implements Node {
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
    action: TripAction
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

  type Vehicle implements Node {
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
