import { RESTDataSource } from 'apollo-datasource-rest'
import { deliveryLocationReducer } from './reducers'

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

  async getDeliveryLocations() {
    const path = `DeliveryLocation/`
    try {
      const response = await this.get(path)
      if (response.status) {
        return response.data.deliverylocations.map(deliveryLocationReducer)
      }
      return []
    } catch (error) {
      return null
    }
  }
}
export default DeliveryLocationApi
