import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { resolve } from 'url'
import { parseHeaers } from './helpers/headers'
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType == responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseheaders = request.getAllResponseHeaders()
      console.log('request.response', request.response, typeof request.response)
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaers(responseheaders),
        config,
        request
      }
      // resolve(response)
      handleResponse(response)
    }
    request.onerror = function handleError() {
      // reject(new Error('Network error'))
      reject(createError('Nextwork Error', config, null, request))
    }
    request.ontimeout = function handleTimeout() {
      // reject(new Error(`Timeout of ${timeout} ms exceeded`))
      reject(createError(`Timeout of ${timeout}`, config, 'ECONNABORTED', request))
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

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }
  })
}
