import { RESTDataSource } from 'apollo-datasource-rest'
import { tripActionLocationReducer } from './reducers'
import { serverErrorUpdateResponse } from './errors'
class TripApi extends RESTDataSource {
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

  async drayingTripDestinations({
    drayingId,
    tripActionId,
    startLocationTypeId,
  }) {
    const url = `DrayingTrip/destinations`
    const params = {
      DeliveryOrderDrayingId: drayingId,
      TripActionId: tripActionId,
      StartLocationTypeId: startLocationTypeId,
    }
    const response = await this.post(url, params)
    if (response.status) {
      return {
        success: response.status,
        message: 'Success',
        tripActionLocations: response.data.map(tripActionLocationReducer),
      }
    }
    return {
      success: false,
      message: 'Oops something went wrong, could not retrieve destinations.',
    }
  }

  async setLost({ tripId, shipperCharges, driverPayment, companyCost }) {
    try {
      const response = await this.post(`DrayingTrip/${tripId}/lost/`, {
        ShipperCharges: shipperCharges,
        DriverPayment: driverPayment,
        CompanyCost: companyCost,
      })
      if (response.status) {
        return {
          success: true,
          message: 'Success!',
          updatedId: tripId,
        }
      }
      return {
        success: false,
        message: 'something went wrong',
        updatedId: null,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }
}

export default TripApi
