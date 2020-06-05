import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'
import mergeConfig from './core/mergeConfig'
//使用混合
function createInstace(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  //把context的属性拓展给instance
  extend(instance, context)
  return instance as AxiosStatic
}
const axios = createInstace(defaults)
axios.create = function(config: AxiosRequestConfig) {
  return createInstace(mergeConfig(defaults, config))
}
export default axios
