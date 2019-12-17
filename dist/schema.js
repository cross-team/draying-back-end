"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

const typeDefs = _apolloServerExpress.gql`
    type Query {
        drayings: [Draying]!
    }

    type Mutation {
        login(user: LoginInput): LoginResponse
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type LoginResponse {
        success: Boolean!
    }

    type Draying {
        id: ID!
        order: Order!
    }

    type Order {
        id: ID!
    }
`;
var _default = typeDefs;
exports.default = _default;