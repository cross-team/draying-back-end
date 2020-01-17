import { RESTDataSource } from 'apollo-datasource-rest'
import { routeReducer } from './reducers'

class RouteApi extends RESTDataSource {
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

  async getRoute() {
    const { data } = await this.get('Route')
    let routes = []
    if (data) {
      routes = data
    }
    return Array.isArray(routes) ? routes.map(route => routeReducer(route)) : []
  }
}
export default RouteApi
