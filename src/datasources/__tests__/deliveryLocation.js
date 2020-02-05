import DeliveryLocationApi from '../deliveryLocation'

const deliveryLocationInput = {
  nickName: 'Graphql delivery locatinn',
  isDefault: false,
  locationTypeId: 1,
  receivingHoursOpen: '02:00',
  receivingHoursClose: '06:00',
  location: {
    nickName: ' google fake rd',
    googleAddress: 'Fake Rd, Pennsylvania 17406, USA',
    locStreet: 'Fake Rd',
    locCity: '',
    locZip: '17406',
    locState: 'PA',
    locCountry: 'US',
    partial: false,
    preferred: true,
    latitude: 39.9735689,
    longitude: -76.6067348,
  },
  contacts: [
    {
      name: 'Testing endpoint',
      description: '',
      contactTypeId: 1,
      active: true,
      phones: [
        {
          phone: '+1 631 881 5559',
          phoneTypeId: 1,
          active: true,
        },
      ],
      emails: [
        {
          email: 'sebastian@rami816.com',
          active: true,
        },
      ],
    },
  ],
}

const deliveryLocationParams = {
  NickName: 'Graphql delivery locatinn',
  IsDefault: false,
  LocationTypeId: 1,
  ReceivingHoursOpen: '02:00',
  ReceivingHoursClose: '06:00',
  Location: {
    NickName: ' google fake rd',
    GoogleAddress: 'Fake Rd, Pennsylvania 17406, USA',
    LocStreet: 'Fake Rd',
    LocCity: '',
    LocZip: '17406',
    LocState: 'PA',
    LocCountry: 'US',
    Partial: false,
    Preferred: true,
    Latitude: 39.9735689,
    Longitude: -76.6067348,
  },
  DeliveryContacts: [
    {
      Name: 'Testing endpoint',
      Description: '',
      ContactTypeId: 1,
      Active: true,
      DeliveryContactPhones: [
        {
          Phone: '+1 631 881 5559',
          PhoneTypeId: 1,
          Active: 1,
        },
      ],
      DeliveryContactEmails: [
        {
          Email: 'sebastian@rami816.com',
          Active: 1,
        },
      ],
    },
  ],
}

const mocks = {
  post: jest.fn(),
}

const ds = new DeliveryLocationApi()
ds.post = mocks.post

beforeEach(() => {
  jest.clearAllMocks()
})

describe('DeliveryLocationApi.addDeliveryLocation', () => {
  it('creates new location with api', async () => {
    mocks.post.mockReturnValueOnce({ data: {}, status: true })

    const res = await ds.addDeliveryLocation({
      deliveryLocation: deliveryLocationInput,
    })
    expect(res).toEqual({ success: true, message: 'Success!', updatedId: null })
    expect(mocks.post).toBeCalledWith(
      'DeliveryLocation/SaveDeliveryLocation',
      deliveryLocationParams,
    )
  })
})
