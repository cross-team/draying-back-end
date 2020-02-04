import { RESTDataSource } from 'apollo-datasource-rest'
import { serverErrorUpdateResponse } from './errors'
import { deliveryLocationMapper } from './mappers'
class DeliveryLocationApi extends RESTDataSource {
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

  async addDeliveryLocation({ deliveryLocation }) {
    const params = deliveryLocationMapper(deliveryLocation)
    try {
      const response = await this.post(
        `DeliveryLocation/SaveDeliveryLocation`,
        params,
      )
      if (response.status) {
        return {
          success: true,
          message: 'Success!',
          updatedId: null,
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

export default DeliveryLocationApi
