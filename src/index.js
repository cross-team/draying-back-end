const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const DrayingApi = require('./datasources/draying')
const LoginApi = require('./datasources/login')
const cookieParser = require('cookie-parser')

const dataSources = () => ({
    drayingApi: new DrayingApi(),
    loginApi: new LoginApi(),
})

const PORT = 4000
const context = ({ req, res }) => {
    const { cookies = '' } = req
    return {
        cookies,
        res,
    }
}

const server = new ApolloServer({
    typeDefs,
    dataSources,
    context,
    resolvers,
})
const app = express()
app.use('*', cookieParser())

server.applyMiddleware({
    app,
    path: '/',
})

if (process.env.NODE_ENV !== 'test')
    app.listen({ port: PORT }, () =>
        console.log(`🚀 app running at http://localhost:${PORT}${server.graphqlPath}`),
    )

module.exports = {
    dataSources,
    context,
    typeDefs,
    resolvers,
    ApolloServer,
    server,
}
