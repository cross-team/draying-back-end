export const idReducer = id =>
  id !== undefined && id !== null
    ? {
        id,
      }
    : undefined

export const carrierReducer = carrier => ({
  id: carrier.CarrierId,
})

export const clientReducer = client => ({
  id: client.ClientId,
  companyName: client.CompanyName,
})

export const drayingCostReducer = cost => ({
  id: cost.DrayingCostId,
  draying: cost.DeliveryOrderDraying
    ? drayingReducer(cost.DeliveryOrderDraying)
    : idReducer(cost.DeliveryOrderDrayingId),
  trip: cost.DrayingTrip
    ? tripReducer(cost.DrayingTrip)
    : idReducer(cost.DrayingTripId),
  costReason: cost.CostReason
    ? costReasonReducer(cost.CostReason)
    : idReducer(cost.CostReasonId),
  companyCost: cost.CompanyCost,
  companyCostSuggested: cost.CompanyCostSuggested,
  shipperCharges: cost.ShipperCharges,
  shipperChargesSuggested: cost.ShipperChargesSuggested,
  driverPayment: cost.DriverPayment,
  driverPaymentSuggested: cost.DriverPaymentSuggested,
  invoiceDescription: cost.InvoiceDescription,
  internalDescription: cost.InternalDescription,
  createdOn: cost.CreatedOn,
  createdBy: cost.CreatedBy,
  modifiedOn: cost.ModifiedOn,
  modifiedBy: cost.ModifiedBy,
  reviewed: cost.Reviewed,
})

export const costReasonReducer = cost => ({
  id: cost.CostReasonId,
  name: cost.Name,
  active: cost.Active,
  order: cost.Orden,
  costType: cost.CostType
    ? costTypeReducer(cost.CostType)
    : idReducer(cost.CostTypeId),
})

export const costTypeReducer = cost => ({
  id: cost.CostTypeId,
  name: cost.Name,
  active: cost.Active,
})

export const containerSizeReducer = containerSize => ({
  id: containerSize.ContainerSizeId,
  name: containerSize.Name,
  size: containerSize.Size,
})

export const containerTypeReducer = containerType => ({
  id: containerType.ContainerTypeId,
  name: containerType.Name,
  shortName: containerType.ShortName,
  order: containerType.Order,
  active: containerType.Active,
})

export const containerStageReducer = containerStage => ({
  id: containerStage.ContainerStageId,
  name: containerStage.Name,
})

export const deliveryLocationReducer = deliveryLocation => ({
  id: deliveryLocation.DeliveryLocationId,
  companyId: deliveryLocation.CompanyId,
  location: deliveryLocation.Location
    ? locationNicknameReducer(deliveryLocation.Location)
    : idReducer(deliveryLocation.LocationId),
  isDefault: deliveryLocation.IsDefault,
  active: deliveryLocation.Active,
  nickName: deliveryLocation.NickName,
  locationType: deliveryLocation.LocationType
    ? locationTypeReducer(deliveryLocation.LocationType)
    : idReducer(deliveryLocation.LocationTypeId),
  receivingHoursOpen: deliveryLocation.ReceivingHoursOpen,
  receivingHoursClose: deliveryLocation.ReceivingHoursClose,
  locationNickName: deliveryLocation.LocationNickName
    ? locationNicknameReducer(deliveryLocation.LocationNickName)
    : idReducer(deliveryLocation.LocationNickNameId),
  createdBy: deliveryLocation.CreatedBy,
  createdOn: deliveryLocation.CreatedOn,
  ...(deliveryLocation.Partial !== null && {
    partial: deliveryLocation.Partial,
  }),
  ...(deliveryLocation.DeliveryContacts !== null && {
    deliveryContacts: deliveryLocation.DeliveryContacts,
  }),
  ...(deliveryLocation.DeliveryOrders && {
    deliveryOrders: deliveryLocation.DeliveryOrders.map(orderReducer),
  }),
  ...(deliveryLocation.DeliveryOrderDrayings && {
    drayings: deliveryLocation.DeliveryOrderDrayings.map(drayingReducer),
  }),
  partial: deliveryLocation.Partial,
  locStreet: deliveryLocation.LocStreet,
  locSuite: deliveryLocation.LocSuite,
  locCity: deliveryLocation.LocCity,
  locZip: deliveryLocation.LocZip,
  locState: deliveryLocation.LocState,
  locCountry: deliveryLocation.LocCountry,
  googleAddress: deliveryLocation.GoogleAddress,
  latitude: deliveryLocation.Latitude,
  longitude: deliveryLocation.Longitude,
})

export const drayingReducer = draying => ({
  id: draying.DeliveryOrderDrayingId,
  order: draying.Order,
  deliveryOrder: draying.DeliveryOrder
    ? orderReducer(draying.DeliveryOrder)
    : idReducer(draying.DeliveryOrderId),
  client: draying.Client
    ? clientReducer(draying.Client)
    : idReducer(draying.ClientId),
  deliveryLocation: draying.DeliveryLocation
    ? deliveryLocationReducer(draying.DeliveryLocation)
    : idReducer(draying.DeliveryLocationId),
  booking: draying.Booking,
  container: draying.Container,
  containerSize:
    draying.ContainerSize && draying.ContainerSize.ContainerSizeId
      ? containerSizeReducer(draying.ContainerSize)
      : idReducer(draying.ContainerSizeId || draying.ContainerSize),
  containerType: draying.ContainerType
    ? containerTypeReducer(draying.ContainerType)
    : idReducer(draying.ContainerTypeId),
  estimateAvailableOn: draying.EstimateAvailableOn,
  lastFreeDay: draying.LastFreeDay,
  daysToReturn: draying.DaysToReturn,
  lastDayToReturn: draying.LastDayToReturn,
  holds: draying.Holds,
  line: draying.Line,
  feesDues: draying.FeesDues,
  feesPaid: draying.FeesPaid,
  preGate: draying.PreGate,
  yardLocation: draying.YardLocation,
  yardStatus: draying.YardStatus,
  loadEmpty: draying.LoadEmpty,
  weight: draying.Weight,
  overDimension: draying.OverDimension,
  hazmat: draying.Hazmat,
  voyageCode: draying.VoyageCode,
  lloydsNo: draying.LloydsNo,
  vesselName: draying.VesselName,
  estimateDischarge: draying.EstimateDischarge,
  containerStage: draying.ContainerStage
    ? containerStageReducer(draying.ContainerStage)
    : idReducer(draying.StageId),
  SCAC: draying.SCAC,
  earlyReturnDate: draying.EarlyReturnDate,
  createdOn: draying.CreatedOn,
  createdBy: draying.CreatedBy,
  modifiedOn: draying.ModifiedOn,
  modifiedBy: draying.ModifiedBy,
  price: draying.Price,
  priceSuggested: draying.PriceSuggested,
  daysStorage: draying.DaysStorage,
  isLive: draying.IsLive,
  prePull: draying.PrePull,
  yardStop: draying.YardStop,
  chassisSplit: draying.ChassisSplit,
  urgent: draying.Urgent,
  appointmentNeeded: draying.AppointmentNeeded,
  appointmentDate: draying.AppointmentDate,
  estimateDeliverTimeFrom: draying.EstimateDeliverTimeFrom,
  estimateDeliverTimeTo: draying.EstimateDeliverTimeTo,
  notReleasedPull: draying.NotReleasedPull,
  terminalLocation: draying.TerminalLocation
    ? terminalLocationReducer(draying.TerminalLocation)
    : idReducer(draying.TerminalLocationId),
  overweight: draying.Overweight,
  isOverDimension: draying.IsOverDimension,
  available: draying.Available,
  isHazmat: draying.IsHazmat,
  estimatedDeliveryDateFrom: draying.EstimatedDeliveryDateFrom,
  estimatedDeliveryDateTo: draying.EstimatedDeliveryDateTo,
  cutOffDate: draying.CutOffDate,
  portStatus: draying.ContainerPortStatus
    ? portStatusReducer(draying.ContainerPortStatus)
    : idReducer(draying.ContainerPortStatusId),
  dontDispatch: draying.DontDispatch,
  loadType: draying.LoadType
    ? loadTypeReducer(draying.LoadType)
    : idReducer(draying.LoadTypeId),
  shippingLine: draying.ShippingLine
    ? shippingLineReducer(draying.ShippingLine)
    : idReducer(draying.ShippingLineId),
  estimateTotalMilesRoundTrip: draying.EstimateTotalMilesRoundTrip,
  estimateTotalTimeRoundTrip: draying.EstimateTotalTimeRoundTrip,
  priority: draying.Priority,
  lastDayToPull: draying.LastDayToPull,
  pullDay: draying.PullDay,
  specificAppoinmentPickUpFromClient:
    draying.SpecificAppoinmentPickUpFromClient,
  pickUpClientDateFrom: draying.PickUpClientDateFrom,
  pickUpClientDateTo: draying.PickUpClientDateTo,
  pickUpClientTimeFrom: draying.PickUpClientTimeFrom,
  pickUpClientTimeTo: draying.PickUpClientTimeTo,
  currentLocationType: draying.CurrentLocation
    ? locationTypeReducer(draying.CurrentLocation)
    : idReducer(draying.CurrentLocationId),
  lastDayToDeliverToClient: draying.LastDayToDeliverToClient,
  dispatchingPriority: draying.DispatchingPriority,
  manualTerminal: draying.ManualTerminal,
  autoLoad: draying.AutoLoad,
  appointmentTime: draying.AppointmentTime,
  returnTerminal: draying.ReturnTerminal
    ? terminalLocationReducer(draying.ReturnTerminal)
    : idReducer(draying.ReturnTerminalId),
  trips: draying.DrayingTrips ? draying.DrayingTrips.map(tripReducer) : null,
  drayingAlerts: draying.DrayingAlerts
    ? draying.DrayingAlerts.map(drayingAlertReducer)
    : null,
  ...(draying.DeliveryOrderDrayingRoundTrips && {
    drayingRoundTrips: draying.DeliveryOrderDrayingRoundTrips.map(
      drayingRoundTripReducer,
    ),
  }),
  seal: draying.Seal,
  customsStatus: draying.CustomsStatus,
  lineStatus: draying.LineStatus,
  lastGateMoveStatus: draying.LastGateMoveStatus,
  lastGateDateTime: draying.LastGateDateTime,
  isLoaded: draying.IsLoaded,
  streetTurn: draying.StreetTurn,
  startLocationStreetTurnId: draying.StartLocationStreetTurnId,
  originStreetTurnDrayingId: draying.OriginStreetTurnDrayingId,
  originStreetTurnLocationNickName: draying.OriginStreetTurnLocationNickName
    ? locationNicknameReducer(draying.OriginStreetTurnLocationNickName)
    : idReducer(draying.originStreetTurnLocationNickNameId),
  returnDate: draying.ReturnDate,
  completedDate: draying.CompletedDate,
  lastDateTimeToDeliverLive: draying.LastDateTimeToDeliverLive,
  lastDateTimeToDeliverDrop: draying.LastDateTimeToDeliverDrop,
  latestDeliveryDateTimeLive: draying.LatestDeliveryDateTimeLive,
  latestDeliveryDateTimeDrop: draying.LatestDeliveryDateTimeDrop,
  latestPickDateTime: draying.LatestPickDateTime,
  latestPullDateTime: draying.LatestPullDateTime,
  availableDay: draying.AvailableDay,
  streetTurnMuted: draying.StreetTurnMuted,
  reviewed: draying.Reviewed,
  invoiced: draying.Invoiced,
  bonded: draying.Bonded,
  carrier: draying.Carrier
    ? carrierReducer(draying.Carrier)
    : idReducer(draying.CarrierId),
  extraStops: draying.DeliveryOrderDrayingExtraStops
    ? draying.DeliveryOrderDrayingExtraStops.map(extraStopReducer)
    : null,
})

export const drayingActionReducer = action => ({
  id: action.DrayingActionId,
  name: action.Name,
  active: action.Active,
  time: action.Time,
  modifiedOn: action.ModifiedOn,
  modifiedBy: action.ModifiedBy,
})

export const drayingAlertReducer = drayingAlert => ({
  id: drayingAlert.DrayingAlertId,
})

export const drayingRoundTripReducer = drayingRoungTrip => ({
  id: drayingRoungTrip.DeliveryOrderDrayingRoundTripId,
})
export const driverReducer = driver => ({
  id: driver.DriverId,
  firstName: driver.FirstName,
  lastName: driver.LastName,
  active: driver.Active,
  dailyWorkHours: driver.DailyWorkHours,
  startDateTime: driver.StartDateTime,
  endDateTime: driver.EndDateTime,
  phone: driver.Phone,
  defaultStartingHoS: driver.DefaultStartingHoS,
  userName: driver.UserName,
  licenseNumber: driver.LicenseNumber,
  licenseState: driver.LicenseState,
  eldExempt: driver.EldExempt,
  eldExemptReason: driver.EldExemptReason,
  eldBigDayExemptionEnabled: driver.EldBigDayExemptionEnabled,
  eldAdverseWeatherExemptionEnabled: driver.EldAdverseWeatherExemptionEnabled,
  eldPcEnabled: driver.EldPcEnabled,
  eldYmEnabled: driver.EldYmEnabled,
  eldDayStartHour: driver.EldDayStartHour,
  // defaultVehicle: driver.DefaultVehicle
  //   ? vehicleReducer(driver.DefaultVehicle)
  //   : idReducer(driver.VehicleId),
  isDeactivated: driver.IsDeactivated,
  driverUserId: driver.DriverUserId,
  saturdayShift: driver.SaturdayShift,
  weeklyWorkHours: driver.WeeklyWorkHours,
  workRadius: driver.WorkRadius,
  baseWeeklySalary: driver.BaseWeeklySalary,
  salaryPerMile: driver.SalaryPerMile,
  salaryPerTripDelivered: driver.SalaryPerTripDelivered,
  defaultYard: driver.DefaultYard
    ? locationNicknameReducer(driver.DefaultYard)
    : idReducer(driver.DefaultYardId),
  homeAddress: driver.HomeAddress
    ? locationNicknameReducer(driver.HomeAddress)
    : idReducer(driver.HomeAddressId),
  defaultVehicle: driver.Vehicle
    ? vehicleReducer(driver.Vehicle)
    : idReducer(driver.DefaultVehicleId),
  ownerOperator: driver.OwnerOperator,
  modifiedBy: driver.ModifiedBy,
  modifiedOn: driver.ModifiedOn,
  createdBy: driver.CreatedBy,
  createdOn: driver.CreatedOn,
  carrier: driver.Carrier
    ? carrierReducer(driver.Carrier)
    : idReducer(driver.CarrierId),
  eLDTokenCarrierId: driver.ELDTokenCarrierId,
  isSmartTrucking: driver.IsSmartTrucking,
  companyId: driver.CompanyId,
})

export const extraStopReducer = extraStop => ({
  id: extraStop.DeliveryOrderDrayingExtraStopId,
  draying: extraStop.DeliveryOrderDraying
    ? drayingReducer(extraStop.DeliveryOrderDraying)
    : idReducer(extraStop.DeliveryOrderDrayingId),
  deliveryLocation: extraStop.DeliveryLocation
    ? deliveryLocationReducer(extraStop.DeliveryLocation)
    : idReducer(extraStop.DeliveryLocationId),
  order: extraStop.Order,
  status: extraStop.Status
    ? tripStatusReducer(extraStop.Status)
    : idReducer(extraStop.StatusId),
  ...(extraStop.CreatedOn !== null && { createdOn: extraStop.CreatedOn }),
  ...(extraStop.CreatedBy !== null && { createdBy: extraStop.CreatedBy }),
  ...(extraStop.ModifiedOn !== null && { modifiedOn: extraStop.ModifiedOn }),
  ...(extraStop.ModifiedBy !== null && { modifiedBy: extraStop.ModifiedBy }),
})

export const loadTypeReducer = loadType => ({
  id: loadType.LoadTypeId,
  name: loadType.Name,
  shortName: loadType.ShortName,
})

export const locationReducer = location => ({
  id: location.LocationId,
  nickName: location.NickName
    ? locationNicknameReducer(location.NickName)
    : idReducer(location.LocationNickNameId),
  preferred: location.Preferred,
  partial: location.Partial,
  contactName: location.ContactName,
  contactPhone: location.ContactPhone,
  modifiedBy: location.ModifiedBy,
  locStreet: location.LocStreet,
  locSuite: location.LocSuite,
  locCity: location.LocCity,
  locZip: location.LocZip,
  locState: location.LocState,
  locCountry: location.LocCountry,
  googleAddress: location.GoogleAddress,
  latitude: location.Latitude,
  longitude: location.Longitude,
})
export const locationNicknameReducer = nickName => ({
  id: nickName.LocationNickNameId,
  name: nickName.NickName,
  partial: nickName.Partial,
  modifiedBy: nickName.ModifiedBy,
  location: nickName.Location
    ? locationReducer(nickName.Location)
    : idReducer(nickName.LocationId),
  locStreet: nickName.LocStreet,
  locSuite: nickName.LocSuite,
  locCity: nickName.LocCity,
  locZip: nickName.LocZip,
  locState: nickName.LocState,
  locCountry: nickName.LocCountry,
  googleAddress: nickName.GoogleAddress,
  latitude: nickName.Latitude,
  longitude: nickName.Longitude,
})

export const locationStateReducer = state => ({
  id: state.DrayingTripLocationStateId,
  name: state.Name,
  shortName: state.ShortName,
  active: state.Active,
})

export const locationTypeReducer = locationType => ({
  id: locationType.LocationTypeId,
  name: locationType.Name,
  active: locationType.Active,
  description: locationType.Description,
  order: locationType.Order,
})

export const orderReducer = order => {
  if (order.OrderId) {
    return {
      id: order.OrderId,
    }
  }
  return {
    id: order,
  }
}

export const portStatusReducer = portStatus => ({
  id: portStatus.ContainerPortStatusId,
  name: portStatus.Name,
  shortName: portStatus.ShortName,
  order: portStatus.Order,
  active: portStatus.Active,
})

export const routeReducer = route => {
  const tripsReducer = trips => {
    return trips.map(tripReducer)
  }
  return {
    id: route.RouteId,
    name: route.Name,
    scheduledStartDateTime: route.ScheduledStartDateTime,
    scheduledEndDateTime: route.ScheduledEndDateTime,
    externalRouteId: route.ExternalRouteId,
    extarnalGroupId: route.ExtarnalGroupId,
    timeZone: route.TimeZone,
    timeZoneDstOffset: route.TimeZoneDstOffset,
    timeZoneRawOffset: route.TimeZoneRawOffset,
    startDateTime: route.StartDateTime,
    endDateTime: route.EndDateTime,
    isEditable: route.IsEditable,
    modifiedBy: route.ModifiedBy,
    modifiedOn: route.ModifiedOn,
    createdBy: route.CreatedBy,
    createdOn: route.CreatedOn,
    startLocationNickName: route.StartLocationNickName
      ? locationNicknameReducer(route.StartLocationNickName)
      : idReducer(route.StartLocationNickNameId),
    trips: route.DrayingTrips ? tripsReducer(route.DrayingTrips) : null,
    driver: route.Driver
      ? driverReducer(route.Driver)
      : idReducer(route.DriverId),
    vehicle: route.Vehicle
      ? vehicleReducer(route.Vehicle)
      : idReducer(route.VehicleId),
  }
}

export const shippingLineReducer = shippingLine => ({
  id: shippingLine.ShippingLineId,
  name: shippingLine.Name,
  shortName: shippingLine.ShortName,
  url: shippingLine.Url,
  active: shippingLine.Active,
})

export const terminalLocationReducer = terminal => ({
  id: terminal.TerminalLocationId,
  shortName: terminal.ShortName,
  isDefault: terminal.IsDefault,
  active: terminal.Active,
  location: terminal.Location
    ? locationNicknameReducer(terminal.Location)
    : idReducer(terminal.LocationId),
  locationType: terminal.LocationType
    ? locationTypeReducer(terminal.LocationType)
    : idReducer(terminal.LocationTypeId),
  radius: terminal.Radius,
  modifiedBy: terminal.ModifiedBy,
  modifiedOn: terminal.ModifiedOn,
  autoLoad: terminal.AutoLoad,
  nickName: terminal.NickName,
  isTerminal: terminal.IsTerminal,
  isDepot: terminal.IsDepot,
  // drayingTimeActionTerminals: terminal.DrayingTimeActionTerminals,
  // terminalLocationHours: terminal.TerminalLocationHours,
  locStreet: terminal.LocStreet,
  locSuite: terminal.LocSuite,
  locCity: terminal.LocCity,
  locZip: terminal.LocZip,
  locState: terminal.LocState,
  locCountry: terminal.LocCountry,
  googleAddress: terminal.GoogleAddress,
  latitude: terminal.Latitude,
  longitude: terminal.Longitude,
})

export const tripReducer = trip => {
  return {
    id: trip.DrayingTripId,
    modifiedBy: trip.ModifiedBy,
    modifiedOn: trip.ModifiedOn,
    createdBy: trip.CreatedBy,
    createdOn: trip.CreatedOn,
    orderRoute: trip.OrderRoute,
    paidByClient: trip.PaidByClient,
    containerLoadedStart: trip.ContainerLoadedStart,
    containerLoadedEnd: trip.ContainerLoadedEnd,
    externalRouteId: trip.ExternalRouteId,
    startLocationType: trip.StartLocationType
      ? locationTypeReducer(trip.StartLocationType)
      : idReducer(trip.StartLocationTypeId),
    endLocationType: trip.EndLocationType
      ? locationTypeReducer(trip.EndLocationType)
      : idReducer(trip.EndLocationTypeId),
    draying: trip.DeliveryOrderDraying
      ? drayingReducer(trip.DeliveryOrderDraying)
      : idReducer(trip.DeliveryOrderDrayingId),
    action: trip.TripAction
      ? tripActionReducer(trip.TripAction)
      : idReducer(trip.TripActionId),
    status: trip.TripStatus
      ? tripStatusReducer(trip.TripStatus)
      : idReducer(trip.TripStatusId),
    driver: trip.Driver ? driverReducer(trip.Driver) : idReducer(trip.DriverId),
    tripActionLocation: trip.TripActionLocation
      ? tripActionLocationReducer(trip.TripActionLocation)
      : idReducer(trip.TripActionLocationId),
    route: trip.Route ? routeReducer(trip.Route) : idReducer(trip.RouteId),
    extraStops: trip.DrayingTripExtraStops
      ? trip.DrayingTripExtraStops.map(extraStopReducer)
      : null,
    ...(trip.DrayingCosts && {
      costs: trip.DrayingCosts.map(drayingCostReducer),
    }), // available on route
    messages: trip.DrayingTripMessages
      ? trip.DrayingTripMessages.map(tripMessageReducer)
      : null,
    ...(trip.DrayingTripLocations && {
      locations: trip.DrayingTripLocations.map(tripLocationReducer),
    }),
  }
}

export const tripActionReducer = action => ({
  id: action.TripActionId,
  name: action.Name,
  shortName: action.ShortName,
  active: action.Active,
})

export const tripActionLocationReducer = actionLocation => ({
  id: actionLocation.TripActionLocationId,
  name: actionLocation.Name,
  loadType: actionLocation.LoadType
    ? loadTypeReducer(actionLocation.LoadType)
    : idReducer(actionLocation.LoadTypeId),
  currentLocationType: actionLocation.CurrentLocationType
    ? locationTypeReducer(actionLocation.CurrentLocationType)
    : idReducer(actionLocation.CurrentLocationTypeId),
  nextLocationType: actionLocation.NextLocationType
    ? locationTypeReducer(actionLocation.NextLocationType)
    : idReducer(actionLocation.NextLocationTypeId),
  chassisRequiredStart: actionLocation.ChassisRequiredStart,
  chassisStatusEnd: actionLocation.ChassisStatusEnd,
  containerLoadedStart: actionLocation.ContainerLoadedStart,
  containerLoadedEnd: actionLocation.ContainerLoadedEnd,
  completedJob: actionLocation.CompletedJob,
  isPayable: actionLocation.IsPayable,
  action: actionLocation.Action
    ? tripActionReducer(actionLocation.Action)
    : idReducer(actionLocation.ActionId),
  active: actionLocation.Active,
  confirmPayable: actionLocation.ConfirmPayable,
  hasSequenceAction: actionLocation.HasSequenceAction,
  order: actionLocation.Order,
  isDriverPayable: actionLocation.IsDriverPayable,
})

export const tripLocationReducer = location => ({
  id: location.DrayingTripLocationId,
  action: location.DrayingAction
    ? drayingActionReducer(location.DrayingAction)
    : idReducer(location.DrayingActionId),
  driver: location.Driver
    ? driverReducer(location.Driver)
    : idReducer(location.DriverId),
  nickName: location.LocationNickName
    ? locationNicknameReducer(location.LocationNickName)
    : idReducer(location.LocationNickNameId),
  vehicle: location.Vehicle
    ? vehicleReducer(location.Vehicle)
    : idReducer(location.VehicleId),
  trip: location.DrayingTrip
    ? tripReducer(location.DrayingTrip)
    : idReducer(location.DrayingTripId),
  ...(location.Order !== null && { order: location.Order }),
  state: location.LocationState
    ? locationStateReducer(location.LocationState)
    : idReducer(location.LocationStateId),
  enRouteAt: location.EnRouteAt,
  arrivedAt: location.ArrivedAt,
  completedAt: location.CompletedAt,
  skippedAt: location.SkippedAt,
  scheduledArrivalAt: location.ScheduledArrivalAt,
  scheduledCompletedAt: location.ScheduledCompletedAt,
  estimatedScheduledArrivalAt: location.EstimatedScheduledArrivalAt,
  estimatedScheduledCompletedAt: location.EstimatedScheduledCompletedAt,
  estimatedWaitingTime: location.EstimatedWaitingTime,
  locationType: location.LocationType
    ? locationTypeReducer(location.LocationType)
    : idReducer(location.LocationTypeId),
  travelMiles: location.TravelMiles,
  travelTime: location.TravelTime,
  estimatedTravelMiles: location.EstimatedTravelMiles,
  estimatedTravelTime: location.EstimatedTravelTime,
  notes: location.Notes,
  modifiedBy: location.ModifiedBy,
  modifiedOn: location.ModifiedOn,
  createdBy: location.CreatedBy,
  createdOn: location.CreatedOn,
})

export const tripMessageReducer = message => ({
  id: message.DrayingTripMessageId,
  trip: message.DrayingTrip
    ? tripReducer(message.DrayingTrip)
    : idReducer(message.DrayingTripId),
  messageTypeId: message.MessageTypeId,
  communicationMethodId: message.CommunicationMethodId,
  subject: message.Subject,
  body: message.Body,
  to: message.To,
  sent: message.Sent,
  createdOn: message.CreatedOn,
  createdBy: message.CreatedBy,
  driver: message.Driver
    ? driverReducer(message.Driver)
    : idReducer(message.DriverId),
})

export const tripStatusReducer = status => ({
  id: status.TripStatusId,
  name: status.Name,
  order: status.Order,
  active: status.Active,
})

export const vehicleReducer = vehicle => ({
  id: vehicle.VehicleId,
  externalVehicleId: vehicle.ExternalVehicleId,
  name: vehicle.Name,
  VIN: vehicle.VIN,
  odometerMeters: vehicle.OdometerMeters,
  modifiedBy: vehicle.ModifiedBy,
  modifiedOn: vehicle.ModifiedOn,
  createdBy: vehicle.CreatedBy,
  createdOn: vehicle.CreatedOn,
  active: vehicle.Active,
  year: vehicle.Year,
  brand: vehicle.Brand,
  model: vehicle.Model,
  weekCost: vehicle.WeekCost,
  costPerMile: vehicle.CostPerMile,
  odometer: vehicle.Odometer,
  carrier: vehicle.Carrier
    ? carrierReducer(vehicle.Carrier)
    : idReducer(vehicle.CarrierId),
  eLDTokenCarrierId: vehicle.ELDTokenCarrierId,
  companyId: vehicle.CompanyId,
  licensePlate: vehicle.LicensePlate,
  eLDLink: vehicle.ELDLink,
})
