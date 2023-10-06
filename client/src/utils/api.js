export const baseUrl = 'http://localhost:8000'

export const apiEndpoints = {
    getUser: '/user'
}

export const apiEndpointBuilder = (endpoint) => {

    return baseUrl + endpoint
}