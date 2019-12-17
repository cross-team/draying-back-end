export default {
    Query: {
        drayings: async (_, __, { dataSources }) => {
            const allDrayings = await dataSources.drayingApi.getAllDrayings()
            // console.log(allDrayings);
            const mappedDrayings = allDrayings.map(draying => ({
                id: draying.DeliveryOrderDrayingId,
                order: draying.DeliveryOrderId,
            }))
            return mappedDrayings
        },
    },
    Mutation: {
        login: async (_, { user: { email, password } }, { dataSources }) => {
            console.log('Resolving...')
            const loginResponse = await dataSources.loginApi.login({
                email,
                password,
            })
            return loginResponse
        },
    },
    Draying: {
        order: draying => {
            return {
                id: draying.order,
            }
        },
    },
}
