export const clientReducer = client => ({})

export const costReducer = cost => ({
  id: cost.CostId,
  type: cost.Type,
  reason: cost.Reason,
})

export const drayingReducer = draying => ({
  id: draying.DeliveryOrderDrayingId,
  order: draying.DeliveryOrder
    ? orderReducer(draying.DeliveryOrder)
    : draying.DeliveryOrderId,
  client: draying.Client ? clientReducer(draying.Client) : draying.ClientId,
})

export const drayingActionReducer = action => ({
  id: action.DrayingActionId,
  name: action.Name,
  active: action.Active,
  time: action.Time,
  modifiedOn: action.ModifiedOn,
  modifiedBy: action.modifiedBy,
})

export const driverReducer = driver => ({})

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

export const routeReducer = route => {
  const tripsReducer = trips => {
    return trips.maps(tripReducer)
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
