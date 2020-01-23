import RouteAPI from '../route'
import MockRouteResponse from '../../mock-data/route.json'
import MockRoutes from '../../mock-data/mockRoutes.json'

const mockRouteResponse = MockRouteResponse.data[0]
const mockRoutes = MockRoutes.data[0]

const mocks = {
  get: jest.fn(),
}

const ds = new RouteAPI()
ds.get = mocks.get

describe('RouteAPI.driverCapacityReducer', () => {
  it('Properly transforms route', () => {
    expect(
      JSON.parse(JSON.stringify(ds.routesReducer([mockRouteResponse]))),
    ).toEqual([mockRoutes])
  })
})

describe('RouteAPI.getRoutesCapaciry]', () => {
  it('looks up drayings from api', async () => {
    mocks.get.mockReturnValueOnce({ data: [mockRouteResponse] })
    const params = {
      driverId: '47',
      fromDate: '1/13/2020',
      toDate: '1/14/2020',
      pending: true,
      orderBy: 'name',
    }
    const res = await ds.getDriverRoute(params)
    expect(res).toEqual([mockRoutes])
    expect(mocks.get).toBeCalledWith('Route', {
      DriverId: '47',
      FromDate: '1/13/2020',
      OrderBy: 'name',
      ShowPending: true,
      ToDate: '1/14/2020',
    })
  })
})
