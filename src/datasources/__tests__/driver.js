import DriverAPI from '../driver'
import MockCapacityResponse from '../../mock-data/capacity.json'
import MockCapacity from '../../mock-data/mockCapacity.json'

const mockCapacityResponse = MockCapacityResponse.data[0]
const mockCapacity = MockCapacity.data[0]

const mocks = {
  get: jest.fn(),
}

const ds = new DriverAPI()
ds.get = mocks.get

describe('DriverAPI.driverCapacityReducer', () => {
  it('Properly transforms draying', () => {
    expect(
      JSON.parse(
        JSON.stringify(ds.driversCapacityReducer(mockCapacityResponse)),
      ),
    ).toEqual(mockCapacity)
  })
})

describe('DriverAPI.getDriversCapaciry]', () => {
  it('looks up drayings from api', async () => {
    mocks.get.mockReturnValueOnce({ data: [mockCapacityResponse] })
    const res = await ds.getDriversCapacity({ date: '1/13/2020' })
    expect(res).toEqual([mockCapacity])
    expect(mocks.get).toBeCalledWith('driver/capacity', {
      OrderBy: 'name',
      RouteDate: '1/13/2020',
      Sort: true,
    })
  })
})
