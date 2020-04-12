import dispatchRequest from './dispatchRequest'
import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  RejectedFn,
  ResolvedFn
} from '../types'
import InterceptorManager from './InterceptorManager'
interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((Config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn | undefined
}
export default class Axios {
  interceptors: Interceptors
  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  request(url: any, config?: any): AxiosPromise {
    //
    //函数重载
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    //初始值，发起请求的程序，最终生成链条如[请求拦截器，请求拦截器，请求程序，响应拦截器，响应拦截器]
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    //响应拦截器，后添加先运行
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    //响应拦截器，后添加后运行
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    let promise = Promise.resolve(config)
    //这里的设计很有意思，不断的把上一个元素得到的resolved和rejected往下传递
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      //一个个的链条里面的内容,但是【请求程序】不是异步的么？这里为何可以这样写
      promise = promise.then(resolved, rejected) //接触赋值之后，之前的promise还是在执行的，只要resolved或者rejected响应，就能在下一级then响应
    }
    return promise
    //return dispatchRequest(config)
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
