import mockMsg from './mockMsg.js'
const Mock = require('mockjs')

const requireServices = require.context('./service', false, /[a-zA-Z]\w+\.js/)
let mockServices = {}
requireServices.keys().forEach(fileName => {
  const serviceConfig = requireServices(fileName)
  const serviceName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
  mockServices[serviceName] = serviceConfig.default || serviceConfig
})
export default {
  install() {
    Object.keys(mockServices).forEach(serviceName => {
      let mockService = mockServices[serviceName]
      Object.keys(mockService).forEach(api => {
        let url = '/' + serviceName + '/' + api
        let result = mockService[api](Mock)
        Mock.mock(url, result.type || 'get', function() {
          return {
            code: result.code,
            msg: mockMsg[result.code],
            data: result.data
          }
        })
      })
    })
  }
}
