import { RESTDataSource } from 'apollo-datasource-rest'
import {
  deliveryLocationReducer,
  containerTypeReducer,
  containerSizeReducer,
} from './reducers'

class LookUpApi extends RESTDataSource {
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

  async getContainerTypes() {
    const path = `containertypes/`
    try {
      const response = await this.get(path)
      if (response.status) {
        return response.data.map(containerTypeReducer)
      }
      return []
    } catch (error) {
      return null
    }
  }

  async getContainerSizes() {
    const path = `containersizes/`
    try {
      const response = await this.get(path)
      if (response.status) {
        return response.data.map(containerSizeReducer)
      }
      return []
    } catch (error) {
      return null
    }
  }
}
export default LookUpApi
