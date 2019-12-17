"use strict";

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _draying = _interopRequireDefault(require("./datasources/draying"));

var _login = _interopRequireDefault(require("./datasources/login"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataSources = () => ({
  drayingApi: new _draying.default(),
  loginApi: new _login.default()
});

const PORT = 4000;

const context = ({
  req,
  res
}) => {
  const {
    cookies = ''
  } = req;
  return {
    cookies,
    res
  };
};

const server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.default,
  dataSources,
  context,
  resolvers: _resolvers.default
});
const app = (0, _express.default)();
app.use('*', (0, _cookieParser.default)());
server.applyMiddleware({
  app,
  path: '/'
});
if (process.env.NODE_ENV !== 'test') app.listen({
  port: PORT
}, () => console.log(`🚀 app running at http://localhost:${PORT}${server.graphqlPath}`));