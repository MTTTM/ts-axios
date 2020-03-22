import { AxiosRequestConfig } from './types/index'
export default function xhr(config: AxiosRequestConfig) {
  const { data, url, method = 'get', headers } = config
  console.log('headers', headers)
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  Object.keys(headers).forEach(name => {
    if (headers[name] === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}
