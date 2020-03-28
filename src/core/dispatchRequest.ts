import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { buildURL } from '../helpers/url'
import { transformRequest, transformRespones } from '../helpers/data'
import { processsHeaders } from '../helpers/headers'
import xhr from './xhr'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

//发起请求前的配置
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  //务必在对data处理之前，transformRequestData JSON.string了
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
//对url进行处理
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}
//对data进行处理
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config

  return processsHeaders(headers, data)
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformRespones(res.data)
  return res
}
