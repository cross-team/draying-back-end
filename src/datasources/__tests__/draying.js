// import DrayingAPI from '../draying'
// import MockDrayings from '../../mock-data/drayings.json'

// const mockDrayingResponse = MockDrayings.data.drayings[0]
// const mockDraying = {
//   id: 22,
//   order: 18,
// }
// const mocks = {
//   get: jest.fn(),
// }

// const ds = new DrayingAPI()
// ds.get = mocks.get

// describe('DrayingAPI.drayingReducer', () => {
//   it('Properly transforms draying', () => {
//     expect(ds.drayingReducer(mockDrayingResponse)).toEqual(mockDraying)
//   })
// })

// describe('DrayingAPI.getAllDrayings]', () => {
//   it('looks up drayings from api', async () => {
//     mocks.get.mockReturnValueOnce({ data: { drayings: [mockDrayingResponse] } })
//     const res = await ds.getAllDrayings()
//     expect(res).toEqual([mockDraying])
//     expect(mocks.get).toBeCalledWith('Draying/Dispatching')
//   })
// })
