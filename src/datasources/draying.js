import { RESTDataSource } from 'apollo-datasource-rest'
import {
  drayingReducer,
  tripActionReducer,
  locationTypeReducer,
  tripReducer,
  tripMessageReducer,
} from './reducers'
import { serverErrorUpdateResponse } from './errors'
class DrayingAPI extends RESTDataSource {
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

  drayingsReducer(drayings) {
    return Array.isArray(drayings)
      ? drayings.map(draying => drayingReducer(draying))
      : []
  }

  async getAllDrayings({
    containerStages,
    containerTypes,
    currentLocationTypes,
    inMovement,
    routeDriverId,
    routeDate,
    sort,
    orderBy,
  }) {
    const params = {
      ContainerStages: containerStages || [],
      ContainerTypes: containerTypes || [],
      CurrentLocationTypes: currentLocationTypes || [],
      InMovement: inMovement,
      RouteDriverId: routeDriverId,
      RouteDate: routeDate,
      Sort: sort,
      OrderBy: orderBy,
    }
    const { data } = await this.get('Draying/Dispatching', params)
    let drayings = []
    if (data && data.drayings) {
      drayings = data.drayings
    }
    return this.drayingsReducer(drayings)
  }

  async getDeliveryOrderDraying({ drayingId }) {
    const { data } = await this.get(`DeliveryOrderDraying/${drayingId}`)
    return drayingReducer(data)
  }

  nextActionsReducer(nextActions) {
    return {
      tripActions: nextActions.trip_actions
        ? nextActions.trip_actions.map(tripActionReducer)
        : null,
      startLocationTypes: nextActions.start_locations
        ? nextActions.start_locations.map(locationTypeReducer)
        : null,
      drayingTrip: nextActions.draying_trip
        ? tripReducer(nextActions.draying_trip)
        : null,
    }
  }

  async getDrayingNextActions({ drayingId, tripId }) {
    let query = `DeliveryOrderDraying/${drayingId}/nextactions`
    if (typeof tripId !== 'undefined') {
      query = `${query}/${tripId}`
    }
    const { data } = await this.get(query)
    return this.nextActionsReducer(data)
  }

  async updateParameter({ drayingId, field, value }) {
    const query = `DeliveryOrderDraying/UpdateParameter/`
    const response = await this.post(query, {
      DeliveryOrderDrayingId: drayingId,
      key: field,
      value,
    })
    if (response.status) {
      return {
        success: response.status,
        message: 'success',
        updatedId: drayingId,
      }
    }
    return {
      success: response.status,
      message: 'Oops Something went wrong',
      updatedId: null,
    }
  }

  async checkContainerNumber({ drayingId, containerNumber }) {
    const query = `DeliveryOrderDraying/CheckContainerNumber`
    const containerReducer = container => ({
      container: container.Container,
      drayingId: container.DeliveryOrderDrayingId,
      orderId: container.DeliveryOrderId,
      createdOn: container.CreatedOn,
      companyName: container.CompanyName,
    })
    try {
      const response = await this.post(query, [
        {
          DeliveryOrderDrayingId: drayingId,
          Container: containerNumber,
        },
      ])
      if (response.status && response.data[containerNumber]) {
        return {
          exists: true,
          message: 'Container alreadly exists',
          containersFound: response.data[containerNumber].map(containerReducer),
        }
      }
      return {
        exists: false,
        message: 'Container not found in system',
      }
    } catch (error) {
      return {
        exists: false,
        message: 'Oops something went wrong',
      }
    }
  }

  async updateDraying({ drayingId, field, value }) {
    return this.updateParameter({ drayingId, field, value })
  }

  async getUndoTripActionMessage({ drayingId }) {
    try {
      const reponse = await this.get(
        `DeliveryOrderDraying/${drayingId}/tripback`,
      )
      if (reponse.status) {
        const { data } = reponse
        if (data.DriverId) {
          return {
            driverId: data.DriverId,
            tripStatusId: data.TripStatusId,
            drayingId: data.DeliveryOrderDrayingId,
            tripMessages: data.DrayingTripMessages.map(tripMessageReducer),
          }
        }
        return {}
      }
      return {}
    } catch (error) {
      return { canUndo: null, message: error.extensions.response.body.message }
    }
  }

  async undoTripAction({ drayingId, sendMessage, body }) {
    try {
      const response = await this.post(
        `DeliveryOrderDraying/${drayingId}/tripback`,
        {
          SendMessage: sendMessage,
          Body: body,
        },
      )
      if (response.status) {
        return {
          success: true,
          message: 'Success!',
          updatedId: drayingId,
        }
      }
      return {
        success: false,
        message: 'something went wrong',
        updatedId: null,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }

  extraStopMapper = extraStop => ({
    DeliveryOrderDrayingId: extraStop.drayingId,
    DeliveryLocationId: extraStop.deliveryLocationId,
  })

  async addExtraStop({ extraStopsAndPrices }) {
    const tripActionPriceMapper = price => ({
      DeliveryOrderDrayingId: price.drayingId,
      TripActionOrder: price.tripActionOrder,
      TripActionId: price.tripActionId,
      Price: price.price,
      PriceQuote: price.priceQuote,
    })

    const path = 'DeliveryOrderDrayingExtraStopWithPrices'
    const params = {
      DeliveryOrderDrayingExtraStops: extraStopsAndPrices.extraStops.map(
        this.extraStopMapper,
      ),
      DeliveryOrderDrayingTripActionPrices: extraStopsAndPrices.tripActionPrices.map(
        tripActionPriceMapper,
      ),
    }
    try {
      const response = await this.post(path, params)
      if (response.status) {
        return { success: true, message: 'Success!', updatedId: null }
      }
      return {
        success: false,
        message: response.message,
        updatedId: null,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }

  async removeExtraStop({ extraStopId }) {
    const path = `DeliveryOrderDrayingExtraStop/${extraStopId}`
    try {
      const response = await this.delete(path)
      if (response.status) {
        return { success: true, message: 'Success!', updatedId: null }
      }
      return {
        success: false,
        message: response.message,
        updatedId: null,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }

  async updateFields({ drayingId, drayingFields }) {
    const errors = []
    drayingFields.forEach(field => {
      try {
        this.updateParameter({
          drayingId,
          field: field.field,
          value: field.value,
        })
      } catch (error) {
        errors.push(serverErrorUpdateResponse(error))
      }
    })
    return {
      success: errors.length === 0,
      errors,
    }
  }

  async addAlert({ drayingId, dateFrom, description, active }) {
    try {
      const response = await this.post(`DrayingAlert`, {
        DeliveryOrderDrayingId: drayingId,
        DateFrom: dateFrom,
        Description: description,
        Active: active,
      })
      if (response.status) {
        return {
          success: true,
          message: 'Success!',
          updatedId: null,
        }
      }
      return {
        success: false,
        message: 'something went wrong',
        updatedId: null,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }

  async addAppointment({ appointment }) {
    try {
      const response = await this.post(`DrayingAlert`, {
        DeliveryOrderDrayingId: appointment.drayingId,
        DeliveryOrderDrayingExtraStopId: appointment.extraStopId,
        AppointmentTypeId: appointment.appointmentTypeId,
        AppointmentLocationTypeId: appointment.appointmentLocationTypeId,
        AppointmentDate: appointment.appointmentDate,
        AppointmentTime: appointment.appointmentTime,
        Note: appointment.notes,
      })
      if (response.status) {
        return {
          success: true,
          message: 'Success!',
          updatedId: null,
        }
      }
      return {
        success: false,
        message: 'something went wrong',
        updatedId: null,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }

  async updatePickUpTerminal({ drayingId, pickUpTerminalId }) {
    try {
      const response = await this.put(
        `DeliveryOrderDraying/${drayingId}/PickUpTerminal`,
        {
          DeliveryOrderDrayingId: drayingId,
          PickUpTerminalId: pickUpTerminalId,
        },
      )
      if (response.status) {
        return {
          success: true,
          message: 'Success!',
          updatedId: null,
        }
      }
      return {
        success: false,
        message: 'something went wrong',
        updatedId: drayingId,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }

  async updateReturnTerminal({ drayingId, returnTerminalId }) {
    try {
      const response = await this.put(
        `DeliveryOrderDraying/${drayingId}/ReturnTerminal`,
        {
          DeliveryOrderDrayingId: drayingId,
          ReturnTerminalId: returnTerminalId,
        },
      )
      if (response.status) {
        return {
          success: true,
          message: 'Success!',
          updatedId: drayingId,
        }
      }
      return {
        success: false,
        message: 'something went wrong',
        updatedId: null,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }

  async masterEdit({ draying }) {
    try {
      const response = await this.post(`DeliveryOrderDraying/MasterEdit/`, {
        DeliveryOrderDrayingId: draying.id,
        ...(draying.deliveryLocationId && {
          DeliveryLocationId: draying.deliveryLocationId,
        }),
        ...(draying.extraStops && {
          DeliveryOrderDrayingExtraStops: draying.extraStops.map(
            this.extraStopMapper,
          ),
        }),
      })
      if (response.status) {
        return {
          success: true,
          message: 'Success!',
          updatedId: draying.id,
        }
      }
      return {
        success: false,
        message: 'something went wrong',
        updatedId: null,
      }
    } catch (error) {
      return serverErrorUpdateResponse(error)
    }
  }
}
export default DrayingAPI
