import { RESTDataSource } from 'apollo-datasource-rest'
import { serverErrorUpdateResponse } from './errors'

class ExtraStopApi extends RESTDataSource {
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

  async addDeliveryLocation({ extraStopId, drayingId, deliveryLocationId }) {
    const params = {
      DeliveryOrderDrayingExtraStopId: extraStopId,
      DeliveryOrderDrayingId: drayingId,
      DeliveryLocationId: deliveryLocationId,
    }
    try {
      const response = await this.put(`DeliveryOrderDrayingExtraStop`, params)
      if (response.status) {
        return {
          success: true,
          message: 'Success!',
          updatedId: extraStopId,
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

export default ExtraStopApi
