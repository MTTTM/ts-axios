import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'
//使用混合
function createInstace(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  //把context的属性拓展给instance
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstace(defaults)
export default axios
