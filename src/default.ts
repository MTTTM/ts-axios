import { AxiosRequestConfig } from './types'
import { processsHeaders } from './helpers/headers'
import { transformRequest, transformRespones } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processsHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformRespones(data)
    }
  ]
}
const methodsNoData = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})
const methodsWidthData = ['post', 'put', 'patch']
methodsWidthData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
