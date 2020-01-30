import { RESTDataSource } from 'apollo-datasource-rest'

class QuoteApi extends RESTDataSource {
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

  async extraStopPrices({ drayingId, deliveryLocationId }) {
    const extraStopPriceReducer = extraStopPrice => {
      return {
        tripActionId: extraStopPrice.TripActionId,
        tripActionOrder: extraStopPrice.TripActionOrder,
        name: extraStopPrice.Name,
        price: extraStopPrice.Price,
        suggestedPrice: extraStopPrice.SuggestedPrice,
      }
    }
    try {
      const url = `ContainerQuote/ExtraStop`
      const params = {
        DeliveryOrderDrayingId: drayingId,
        DeliveryLocationId: deliveryLocationId,
      }
      const response = await this.post(url, params)
      if (response.status) {
        return response.data.map(extraStopPriceReducer)
      }
      return null
    } catch (error) {
      return null
    }
  }
}
export default QuoteApi
