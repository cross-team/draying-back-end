import { RESTDataSource } from 'apollo-datasource-rest'

class DrayingAPI extends RESTDataSource {
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

  drayingReducer(draying) {
    return {
      id: draying.DeliveryOrderDrayingId,
      order: draying.DeliveryOrderId,
    }
  }

  driversCapacityReducer(driver) {
    const locationsReducer = locations => {
      return locations
        ? locations.map(location => ({
            id: location.DrayingTripLocationId,
            action: {
              id: location.DrayingActionId,
              name: location.DrayingAction,
            },
            driver: {
              id: location.DriverId,
            },
            nickName: location.LocationNickName,
            vehicle: {
              id: location.VehicleId,
              name: location.Vehicle,
            },
            trip: {
              id: location.DrayingTripId,
            },
            dispatchJob: location.DispatchJobId
              ? {
                  id: location.DispatchJobId,
                }
              : null,
            order: {
              id: location.Order,
            },
            chasis: location.Chassis,
            booking: location.Booking
              ? {
                  id: location.Booking,
                }
              : null,
            container: location.Container
              ? {
                  id: location.Container,
                  size: location.ContainerSize,
                }
              : null,
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
            estimatedScheduledCompletedAt:
              location.EstimatedScheduledCompletedAt,
            estimatedWaitingTime: location.EstimatedWaitingTime,
            locationType: {
              id: location.LocationTypeId,
            },
            travelMiles: location.TravelMiles,
            travelTime: location.TravelTime,
            estimatedTravelMiles: location.EstimatedTravelMiles,
            estimatedTravelTime: location.EstimatedTravelTime,
            notes: location.Notes,
            loadType: location.LoadTypeId
              ? {
                  id: location.LoadTypeId,
                }
              : null,
            modifiedBy: location.ModifiedBy,
            modifiedOn: location.ModifiedOn,
            createdBy: location.CreatedBy,
            createdOn: location.CreatedOn,
          }))
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
      trip: tripReducer(driver.DrayingTrip),
    }
  }

  async getAllDrayings() {
    const { data } = await this.get('Draying/Dispatching')
    let drayings = []
    if (data && data.drayings) {
      drayings = data.drayings
    }
    return Array.isArray(drayings)
      ? drayings.map(draying => this.drayingReducer(draying))
      : []
  }

  async getDriversCapacity() {
    const { data } = await this.get('driver/capacity')
    let drivers = []
    if (data) {
      drivers = data
    }
    return Array.isArray(drivers)
      ? drivers.map(driver => this.driversCapacityReducer(driver))
      : []
  }
}
export default DrayingAPI
