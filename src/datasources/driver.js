import { RESTDataSource } from 'apollo-datasource-rest'

class DriverAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://dev-mercuriotransport.azurewebsites.net/api/v1/'
  }

  willSendRequest(request) {
    request.headers.set(
      'Cookie',
      `.DRAYINGAUTH=${this.context.cookies['.DRAYINGAUTH']}`,
    )
  }

  driversCapacityReducer(driver) {
    const locationReducer = location => ({
      id: location.DrayingTripLocationId,
      action: {
        id: location.DrayingActionId,
        name: location.DrayingAction,
      },
      driver: {
        id: location.DriverId,
      },
      nickName: location.LocationNickName
        ? {
            id: location.LocationNickName.LocationNickNameId,
            name: location.LocationNickName.NickName,
            partial: location.LocationNickName.Partial,
            modifiedBy: location.LocationNickName.ModifiedBy,
            locationId: location.LocationNickName.LocationId,
            locStreet: location.LocationNickName.LocStreet,
            locSuite: location.LocationNickName.LocSuite,
            locCity: location.LocationNickName.LocCity,
            locZip: location.LocationNickName.LocZip,
            locState: location.LocationNickName.LocState,
            locCountry: location.LocationNickName.LocCountry,
            googleAddress: location.LocationNickName.GoogleAddress,
            latitude: location.LocationNickName.Latitude,
            longitude: location.LocationNickName.Longitude,
          }
        : null,
      vehicle: {
        id: location.VehicleId,
        name: location.Vehicle,
      },
      trip: {
        id: location.DrayingTripId,
      },
      order: {
        id: location.Order,
      },
      state: {
        id: location.LocationStateID,
      },
      enRouteAt: location.EnRouteAt,
      arrivedAt: location.ArrivedAt,
      completedAt: location.CompletedAt,
      skippedAt: location.SkippedAt,
      scheduledArrivalAt: location.ScheduledArrivalAt,
      scheduledCompletedAt: location.ScheduledCompletedAt,
      estimatedScheduledArrivalAt: location.EstimatedScheduledArrivalAt,
      estimatedScheduledCompletedAt: location.EstimatedScheduledCompletedAt,
      estimatedWaitingTime: location.EstimatedWaitingTime,
      locationType: {
        id: location.LocationTypeId,
      },
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
    const locationsReducer = locations => {
      return locations
        ? locations.map(location => locationReducer(location))
        : null
    }
    const tripReducer = trip =>
      trip
        ? {
            id:
              trip.DrayingTripLocations.length > 0
                ? trip.DrayingTripLocations[0].DrayingTripId
                : 'No ID',
            companyName: trip.CompanyName,
            status: trip.TripStatusId,
            containerSize: trip.ContainerSize,
            contianerType: trip.ContainerType,
            shippingLine: trip.ShippingLine,
            locations: locationsReducer(trip.DrayingTripLocations),
            timeZone: trip.TimeZone,
            timeZoneDstOffset: trip.TimeZoneDstOffset,
            timeZoneRawOffset: trip.TimeZoneRawOffset,
            currentRouteTime: trip.currentRouteTime,
            startTrip: trip.startTrip,
            endTrip: trip.endTrip,
            progress: trip.Progress,
            currentDestination: trip.CurrentDestination
              ? locationReducer(trip.CurrentDestination)
              : null,
            lastDestination: trip.LastDestination
              ? locationReducer(trip.LastDestination)
              : null,
          }
        : null
    return {
      id: driver.DriverId,
      firstName: driver.FirstName,
      lastName: driver.LastName,
      active: driver.Active,
      dailyWorkHours: driver.DailyWorkHours,
      startDateTime: driver.StartDateTime,
      endDateTime: driver.EndDateTime,
      capacity: driver.Capacity,
      pendingTripsCount: driver.PendingDrayingTripsCount,
      trip: tripReducer(driver.DrayingTrip),
    }
  }

  async getDriversCapacity({
    date,
    orderBy = 'name',
    sortAsc = true,
    driverName,
  }) {
    let queryParams = {
      Sort: sortAsc,
      OrderBy: orderBy,
      RouteDate: date,
    }
    if (driverName) {
      queryParams = {
        ...queryParams,
        Name: driverName,
      }
    }
    const { data } = await this.get('driver/capacity', queryParams)

    let drivers = []
    if (data) {
      drivers = data
    }
    return Array.isArray(drivers)
      ? drivers.map(driver => this.driversCapacityReducer(driver))
      : []
  }
}
export default DriverAPI
