import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    drayings(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): DrayingConnection!
  }

  type Mutation {
    login(user: LoginInput!): LoginResponse!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    success: Boolean!
    message: String!
  }

  type DrayingConnection {
    cursor: String!
    hasMore: Boolean!
    drayings: [Draying]!
  }

  type Draying {
    id: ID!
    order: Order!
  }

  type Order {
    id: ID!
  }
`
export default typeDefs
