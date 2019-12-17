const { gql } = require('apollo-server-express')

const typeDefs = gql`
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
`
module.exports = typeDefs
