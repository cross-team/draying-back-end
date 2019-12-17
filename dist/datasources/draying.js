"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloDatasourceRest = require("apollo-datasource-rest");

class DrayingAPI extends _apolloDatasourceRest.RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://dev-mercuriotransport.azurewebsites.net/api/v1/';
  }

  willSendRequest(request) {
    request.headers.set('Cookie', `.DRAYINGAUTH=${this.context.cookies['.DRAYINGAUTH']}`);
  }

  async getAllDrayings() {
    const {
      data
    } = await this.get('Draying/Dispatching');
    return Array.isArray(data.drayings) ? data.drayings : [];
  }

}

var _default = DrayingAPI;
exports.default = _default;