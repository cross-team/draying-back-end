import DriverAPI from '../draying'
import MockDrivers from '../../mock-data/capacity.json'

const mockDriverResponse = MockDrivers.data.drayings[0]
const mockDriver = {
  id: 22,
  order: 18,
}
const mocks = {
  get: jest.fn(),
}

const ds = new DriverAPI()
ds.get = mocks.get

describe('DriverAPI.driverCapacityReducer', () => {
  it('Properly transforms draying', () => {
    expect(ds.drayingReducer(mockDriverResponse)).toEqual(mockDriver)
  })
})

describe('DriverAPI.getDriversCapaciry]', () => {
  it('looks up drayings from api', async () => {
    mocks.get.mockReturnValueOnce({ data: { drayings: [mockDriverResponse] } })
    const res = await ds.getAllDrivers()
    expect(res).toEqual([mockDriver])
    expect(mocks.get).toBeCalledWith('Driver/Dispatching')
  })
})
