import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    drayings(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      first: Int
      last: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      before: String
      after: String
    ): DrayingConnection!
  }

  type DrayingConnection {
    pageInfo: PageInfo!
    edges: [DrayingEdge]
    nodes: [Draying]!
    totalCount: Int!
  }

  type PageInfo {
    endCursor: String

    hasNextPage: Boolean!

    hasPreviousPage: Boolean!

    startCursor: String
  }

  type DrayingEdge {
    node: Node!
    cursor: String!
  }

  type Draying implements Node {
    id: ID!
    order: Order!
  }

  type Order implements Node {
    id: ID!
  }

  interface Node {
    id: ID!
  }

  type Route {
    id: ID!
  }

  type Mutation {
    login(user: LoginInput): LoginResponse!
  }

  input LoginInput {
    email: String!
    password: String!
    host: String!
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    token: String!
    email: String!
  }
`
export default typeDefs
