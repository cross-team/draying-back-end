export const carrierReducer = carrier => ({
  id: carrier.CarrierId,
})

export const clientReducer = client => ({})

export const costReducer = cost => ({
  id: cost.CostId,
  type: cost.Type,
  reason: cost.Reason,
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
  id: containerStage.StageId,
})

export const deliveryLocationReducer = deliveryLocation => ({
  id: deliveryLocation.DeliveryLocationId,
  location: deliveryLocation.Location
    ? locationReducer(deliveryLocation.Location)
    : deliveryLocation.LocationId,
  isDefault: deliveryLocation.IsDefault,
  active: deliveryLocation.Active,
  locationType: deliveryLocation.LocationType
    ? locationTypeReducer(deliveryLocation.LocationType)
    : deliveryLocation.LocationTypeId,
  receivingHoursOpen: deliveryLocation.ReceivingHoursOpen,
  receivingHoursClose: deliveryLocation.ReceivingHoursClose,
  nickName: deliveryLocation.LocationNickName
    ? locationNicknameReducer(deliveryLocation.LocationNickName)
    : deliveryLocation.LocationNickNameId,
  partial: deliveryLocation.Partial,
  deliveryContacts: deliveryLocation.DeliveryContacts,
  deliveryOrder: deliveryLocation.DeliveryOrders,
  drayings: deliveryLocation.DeliveryOrderDrayings
    ? deliveryLocation.DeliveryOrderDrayings.map(drayingReducer)
    : null,
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
  order: draying.DeliveryOrder
    ? orderReducer(draying.DeliveryOrder)
    : draying.DeliveryOrderId,
  client: draying.Client ? clientReducer(draying.Client) : draying.ClientId,
  deliveryLocation: draying.DeliveryLocation
    ? deliveryLocationReducer(draying.DeliveryLocation)
    : draying.DeliveryLocationId,
  booking: draying.Booking,
  container: draying.Container,
  containerSize: draying.ContainerSize
    ? containerSizeReducer(draying.ContainerSize)
    : draying.ContainerSizeId,
  containerType: draying.ContianerType
    ? containerTypeReducer(draying.containerType)
    : draying.ContainerTypeId,
  estimateAvailableOn: draying.EstimateAvailableOn,
  lastFreeDay: draying.LastFreeDay,
  daysToReturn: draying.DaysToReturn,
  lastDayToReturn: draying.LastDayToReturn,
  holds: draying.Holds,
  line: draying.Line,
  feesDues: draying.FeesDues,
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
  stage: draying.ContainerStage
    ? containerStageReducer(draying.ContainerStage)
    : draying.StageId,
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
    : draying.TerminalLocationId,
  overweight: draying.Overweight,
  isOverDimension: draying.IsOverDimension,
  available: draying.Available,
  isHazmat: draying.IsHazmat,
  estimatedDeliveryDateFrom: draying.EstimatedDeliveryDateFrom,
  estimatedDeliveryDateTo: draying.EstimatedDeliveryDateTo,
  cutOffDate: draying.CutOffDate,
  portStatus: draying.ContainerPortStatus
    ? portStatusReducer(draying.ContainerPortStatus)
    : draying.ContainerPortStatusId,
  dontDispatch: draying.DontDispatch,
  loadType: draying.LoadType
    ? loadTypeReducer(draying.LoadType)
    : draying.LoadTypeId,
  shippingLine: draying.ShippingLine
    ? shippingLineReducer(draying.ShippingLine)
    : draying.ShippingLineId,
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
    : draying.CurrentLocationId,
  lastDayToDeliverToClient: draying.LastDayToDeliverToClient,
  dispatchingPriority: draying.DispatchingPriority,
  manualTerminal: draying.ManualTerminal,
  autoLoad: draying.AutoLoad,
  appointmentTime: draying.AppointmentTime,
  returnTerminal: draying.ReturnTerminal
    ? terminalLocationReducer(draying.ReturnTerminal)
    : draying.ReturnTerminalId,
  trips: draying.DrayingTrips ? draying.DrayingTrips.map(tripReducer) : null,
})

export const drayingActionReducer = action => ({
  id: action.DrayingActionId,
  name: action.Name,
  active: action.Active,
  time: action.Time,
  modifiedOn: action.ModifiedOn,
  modifiedBy: action.modifiedBy,
})

export const driverReducer = driver => ({
  id: driver.DriverId,
  firstName: driver.FirstName,
  lastName: driver.LastName,
  active: driver.Active,
  dailyWorkHours: driver.DailyWorkHours,
  startDateTime: driver.StartDateTime,
  endDateTime: driver.EndDateTime,
  capacity: driver.Capacity,
  pendingTripsCount: driver.PendingDrayingTripsCount,
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
  vehicle: driver.Vehicle ? vehicleReducer(driver.Vehicle) : driver.VehicleId,
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
    : driver.DefaultYardId,
  homeAddress: driver.HomeAddress
    ? locationNicknameReducer(driver.HomeAddress)
    : driver.HomeAddressId,
  defaultVehicle: driver.Vehicle
    ? vehicleReducer(driver.Vehicle)
    : driver.VehicleId,
  ownerOperator: driver.OwnerOperator,
  modifiedBy: driver.ModifiedBy,
  modifiedOn: driver.ModifiedOn,
  createdBy: driver.CreatedBy,
  createdOn: driver.CreatedOn,
  carrier: driver.Carrier ? carrierReducer(driver.Carrier) : driver.CarrierId,
  eLDTokenCarrierId: driver.ELDTokenCarrierId,
  isSmartTrucking: driver.IsSmartTrucking,
  companyId: driver.CompanyId,
})

export const extraStopReducer = extraStop => ({
  id: extraStop.DeliveryOrderDrayingExtraStopId,
  draying: extraStop.DeliveryOrderDrayingId,
  deliveryLocation: extraStop.DeliveryLocationId,
  order: extraStop.Order ? orderReducer(extraStop.Order) : extraStop.OrderId,
  status: extraStop.Status
    ? tripStatusReducer(extraStop.Status)
    : extraStop.StatusId,
  createdOn: extraStop.CreatedOn,
  createdBy: extraStop.CreatedBy,
  modifiedOn: extraStop.ModifiedOn,
  modifiedBy: extraStop.ModifiedBy,
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
    : location.LocationNickNameId,
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
  locationId: nickName.LocationId,
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
})

export const orderReducer = order => ({
  id: order.OrderId,
})

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
      : route.StartLocationNickNameId,
    trips: route.DrayingTrips ? tripsReducer(route.DrayingTrips) : null,
    driver: route.Driver ? driverReducer(route.Driver) : route.DriverId,
    vehicle: route.Vehicle ? vehicleReducer(route.Vehicle) : route.VehicleId,
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
  locationType: terminal.LocationType
    ? locationTypeReducer(terminal.LocationType)
    : terminal.LocationTypeId,
  radius: terminal.Radius,
  modifiedBy: terminal.ModifiedBy,
  modifiedOn: terminal.ModifiedOn,
  autoLoad: terminal.AutoLoad,
  nickName: terminal.NickName,
  isTerminal: terminal.IsTerminal,
  isDeport: terminal.IsDepot,
  drayingTimeActionTerminals: terminal.DrayingTimeActionTerminals,
  terminalLocationHours: terminal.TerminalLocationHours,
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
    order: trip.Order ? trip.Order : trip.OrderRoute,
    modifiedBy: trip.ModifiedBy,
    modifiedOn: trip.ModifiedOn,
    createdBy: trip.CreatedBy,
    createdOn: trip.CreatedOn,
    orderRoute: trip.OrderRoute,
    paidByClient: trip.PaidByClient,
    containerLoadedStart: trip.ContainerLoadedStart,
    containerLoadedEnd: trip.ContainerLoadedEnd,
    externalRouteId: trip.externalRouteId,
    startLocationType: trip.StartLocationType
      ? locationTypeReducer(trip.StartLocationType)
      : trip.StartLocationTypeId,
    endLocationType: trip.EndLocationType
      ? locationTypeReducer(trip.EndLocationType)
      : trip.EndLocationTypeId,
    draying: trip.DeliveryOrderDraying
      ? drayingReducer(trip.DeliveryOrderDraying)
      : trip.DeliveryOrderDrayingId,
    action: trip.TripAction
      ? tripActionReducer(trip.TripAction)
      : trip.TripActionId,
    status: trip.TripStatus
      ? tripStatusReducer(trip.TripStatus)
      : trip.TripStatusId,
    driver: trip.Driver ? driverReducer(trip.Driver) : trip.DriverId,
    actionLocation: trip.TripActionLocation
      ? tripActionLocationReducer(trip.TripActionLocation)
      : trip.TripActionLocationId,
    route: trip.Route ? routeReducer(trip.Route) : trip.RouteId,
    extraStops: trip.DrayingTripExtraStops
      ? trip.DrayingTripExtraStops.map(extraStopReducer)
      : null,
    costs: trip.DrayingCosts ? trip.DrayingCosts.map(costReducer) : null,
    messages: trip.DrayingTripMessages
      ? trip.DrayingTripMessages.map(tripMessageReducer)
      : null,
    locations: trip.DrayingTripLocations
      ? trip.DrayingTripLocations.map(tripLocationReducer)
      : null,
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
})

const tripLocationReducer = location => ({
  id: location.DrayingTripLocationId,
  action: location.DrayingAction
    ? drayingActionReducer(location.DrayingAction)
    : location.DrayingActionId,
  driver: location.Driver ? driverReducer(location.Driver) : location.DriverId,
  nickName: location.LocationNickName
    ? locationNicknameReducer(location.LocationNickName)
    : location.LocationNickNameId,
  vehicle: location.Vehicle
    ? vehicleReducer(location.Vehicle)
    : location.VehicleId,
  trip: location.DrayingTrip
    ? tripReducer(location.DrayingTrip)
    : location.DrayingTripId,
  order: location.Order,
  state: location.DrayingTripLocationState
    ? locationStateReducer(location.DrayingTripLocationState)
    : location.DrayingTripLocationStateId,
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
    : location.LocationTypeId,
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
})

export const tripStatusReducer = status => ({
  id: status.TripStatusId,
  name: status.Name,
  order: status.Order,
  active: status.Active,
})

export const vehicleReducer = vehicle => ({})
