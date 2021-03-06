import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    //如果传入的是小写
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name] //删除小写的
    }
  })
}
export function processsHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    //如果不存在，默认发送json
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  console.log('isPlainObject(data)', headers)
  return headers
}
export function parseHeaers(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  //合并到一个对象中
  headers = deepMerge(headers.common, headers[method], headers)
  //合并之后删除原来在header里面做的对应配置，因为header不需要多层的配置
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}
