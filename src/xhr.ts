import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { resolve } from 'url'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data, url, method = 'get', headers, responseType } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType == responseType
    }

    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
        return
      }
      const responseheaders = request.getAllResponseHeaders()
      console.log('request.response', request.response, typeof request.response)
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseheaders,
        config,
        request
      }
      resolve(response)
    }
    Object.keys(headers).forEach(name => {
      //如果内容为空，就干掉
      if (headers[name] === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
