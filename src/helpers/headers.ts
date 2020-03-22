import { isPlainObject } from './util'
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
  console.log('config', headers)
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;chatset=utf-8'
    }
  }
  return headers
}
