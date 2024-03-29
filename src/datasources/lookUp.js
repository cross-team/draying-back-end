import { RESTDataSource } from 'apollo-datasource-rest'
import {
  deliveryLocationReducer,
  containerTypeReducer,
  containerSizeReducer,
  costReasonReducer,
  costTypeReducer,
  terminalLocationReducer,
  contactTypeReducer,
  phoneTypeReducer,
  shippingLineReducer,
  locationTypeReducer,
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

  async getCostReasons() {
    const path = `CostReasons`
    try {
      const response = await this.get(path)
      if (response.status) {
        return response.data.map(costReasonReducer)
      }
      return []
    } catch (error) {
      return null
    }
  }

  async getCostTypes() {
    const path = `CostTypes`
    try {
      const response = await this.get(path)
      if (response.status) {
        return response.data.map(costTypeReducer)
      }
      return []
    } catch (error) {
      return null
    }
  }

  async getActiveTerminalLocations() {
    const path = `Draying/ActionLocation`
    try {
      const response = await this.get(path)
      if (response.status) {
        return response.data.map(terminalLocationReducer)
      }
      return []
    } catch (error) {
      return null
    }
  }

  async getContactTypes() {
    const path = `contacttypes`
    try {
      const response = await this.get(path)
      if (response.status) {
        return response.data.map(contactTypeReducer)
      }
      return []
    } catch (error) {
      return null
    }
  }

  async getPhoneTypes() {
    const path = `phonetypes`
    try {
      const response = await this.get(path)
      if (response.status) {
        return response.data.map(phoneTypeReducer)
      }
      return []
    } catch (error) {
      return null
    }
  }

  async getShippingLines() {
    const path = `shippinglines`
    try {
      const response = await this.get(path)
      if (response.status) {
        return response.data.map(shippingLineReducer)
      }
      return []
    } catch (error) {
      return null
    }
  }

  async getLocationTypes() {
    const path = `locationtypes`
    try {
      const response = await this.get(path)
      if (response.status) {
        return response.data.map(locationTypeReducer)
      }
      return []
    } catch (error) {
      return null
    }
  }
}
export default LookUpApi
