export const extraStopMapper = extraStop => ({
  DeliveryOrderDrayingId: extraStop.drayingId,
  DeliveryLocationId: extraStop.deliveryLocationId,
})

export const locationMapper = location => ({
  NickName: location.nickName,
  GoogleAddress: location.googleAddress,
  LocStreet: location.locStreet,
  LocSuite: location.locSuite,
  LocCity: location.locCity,
  LocZip: location.locZip,
  LocState: location.locState,
  LocCountry: location.locCountry,
  Partial: location.partial,
  Preferred: location.preferred,
  Latitude: location.latitude,
  Longitude: location.longitude,
})

export const deliveryContactMapper = contact => ({
  Name: contact.name,
  Description: contact.Description,
  ContactTypeId: contact.ContactTypeId,
  Active: contact.Active,
  DeliveryContactPhones: contact.phones.map(deliveryContactPhoneMapper),
  DeliveryContactEmails: contact.emails.map(deliveryContactEmailMapper),
})

export const deliveryContactPhoneMapper = phone => ({
  Phone: phone.phone,
  PhoneTypeId: phone.phoneTypeId,
  Active: phone.active ? 1 : 0,
})

export const deliveryContactEmailMapper = email => ({
  Email: email.email,
  Active: email.active ? 1 : 0,
})

export const deliveryLocationMapper = deliveryLocation => ({
  NickName: deliveryLocation.nickName,
  IsDefault: deliveryLocation.isDefault,
  LocationTypeId: deliveryLocation.locationTypeId,
  ReceivingHoursOpen: deliveryLocation.receivingHoursOpen,
  ReceivingHoursClose: deliveryLocation.receivingHoursClose,
  Location: locationMapper(deliveryLocation.location),
  DeliveryContacts: deliveryLocation.contacts.map(deliveryContactMapper),
})
