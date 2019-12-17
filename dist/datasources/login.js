"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloDatasourceRest = require("apollo-datasource-rest");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _nodeHtmlParser = require("node-html-parser");

var _url = require("url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LoginAPI extends _apolloDatasourceRest.RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://dev-mercuriotransport.azurewebsites.net/';
  }

  async login({
    email,
    password
  }) {
    const getRequestToken = async () => {
      const fetchResponse = await (0, _nodeFetch.default)(this.baseURL + 'login');
      const loginForm = (0, _nodeHtmlParser.parse)((await fetchResponse.text({
        type: 'text/html'
      }))).querySelector('#loginForm');
      return loginForm.firstChild.attributes.value;
    };

    const parseCookies = response => {
      const raw = response.headers.raw()['set-cookie'];
      return raw.map(entry => {
        const parts = entry.split(';');
        const cookiePart = parts[0];
        return cookiePart;
      });
    };

    const authenticate = async () => {
      const params = new _url.URLSearchParams();
      params.append('__RequestVerificationToken', getRequestToken());
      params.append('Email', email);
      params.append('Password', password);
      const response = await (0, _nodeFetch.default)(this.baseURL + 'Login', {
        method: 'post',
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'manual'
      });

      if (response.status === 302) {
        return {
          success: true,
          cookies: parseCookies(response)
        };
      }

      return {
        success: false
      };
    };

    const {
      success,
      cookies
    } = await authenticate();

    if (success) {
      this.context.res.set('Set-Cookie', cookies[2]);
    }

    return {
      success
    };
  }

}

var _default = LoginAPI;
exports.default = _default;