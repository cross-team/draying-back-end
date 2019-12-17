import { RESTDataSource } from 'apollo-datasource-rest'

class DrayingAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'https://dev-mercuriotransport.azurewebsites.net/api/v1/'
    }

    willSendRequest(request) {
        request.headers.set('Cookie', `.DRAYINGAUTH=${this.context.cookies['.DRAYINGAUTH']}`)
    }

    async getAllDrayings() {
        const { data } = await this.get('Draying/Dispatching')
        return Array.isArray(data.drayings) ? data.drayings : []
    }
}
export default DrayingAPI
