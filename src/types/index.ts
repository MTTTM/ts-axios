import { request } from 'http'

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIOS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
export interface AxiosRequestConfig {
  url?: string
  method?: string
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  Response?: AxiosResponse
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config: AxiosRequestConfig): AxiosPromise
  head(url: string, config: AxiosRequestConfig): AxiosPromise
  options(url: string, config: AxiosRequestConfig): AxiosPromise
  post(url: string, data: any, config: AxiosRequestConfig): AxiosPromise
  put(url: string, data: any, config: AxiosRequestConfig): AxiosPromise
  patch(url: string, data: any, config: AxiosRequestConfig): AxiosPromise
}
//混合型接口
export interface AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise
}
