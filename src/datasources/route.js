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

  async getDriverRoute({ driverId, fromDate, toDate, pending, orderBy }) {
    let queryParams = {
      DriverId: driverId,
    }

    if (fromDate) {
      queryParams = {
        ...queryParams,
        FromDate: fromDate,
      }
    }

    if (toDate) {
      queryParams = {
        ...queryParams,
        ToDate: toDate,
      }
    }

    if (pending) {
      queryParams = {
        ...queryParams,
        ShowPending: pending,
      }
    }

    if (orderBy) {
      queryParams = {
        ...queryParams,
        OrderBy: orderBy,
      }
    }
    const { data } = await this.get('Route', queryParams)
    let routes = []
    if (data) {
      routes = data
    }
    return Array.isArray(routes) ? routes.map(route => routeReducer(route)) : []
  }
}
export default RouteApi
