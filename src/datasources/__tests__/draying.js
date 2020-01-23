import DrayingAPI from '../draying'
import MockDrayingsReponse from '../../mock-data/drayings.json'
import MockDrayings from '../../mock-data/mockDrayings.json'

const mockDrayingResponse = MockDrayingsReponse.data.drayings[0]

const mocks = {
  get: jest.fn(),
}

const ds = new DrayingAPI()
ds.get = mocks.get

describe('DrayingAPI.drayingReducer', () => {
  it('Properly transforms draying', () => {
    expect(
      JSON.parse(JSON.stringify(ds.drayingsReducer([mockDrayingResponse]))),
    ).toEqual(MockDrayings.data)
  })
})

describe('DrayingAPI.getAllDrayings]', () => {
  it('looks up drayings from api', async () => {
    mocks.get.mockReturnValueOnce({ data: { drayings: [mockDrayingResponse] } })
    const params = {
      containerStages: [5, 6, 7, 8],
      containerTypes: [],
      currentLocationTypes: [],
      inMovement: false,
      routeDriverId: 48,
      routeDate: '12/20/2019',
      sort: false,
      orderBy: 'priority',
    }
    const res = await ds.getAllDrayings(params)
    expect(res).toEqual([MockDrayings.data[0]])
    expect(mocks.get).toBeCalledWith('Draying/Dispatching', {
      ContainerStages: [5, 6, 7, 8],
      ContainerTypes: [],
      CurrentLocationTypes: [],
      InMovement: false,
      RouteDriverId: 48,
      RouteDate: '12/20/2019',
      Sort: false,
      OrderBy: 'priority',
    })
  })
})
