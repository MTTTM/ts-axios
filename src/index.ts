import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
//使用混合
function createInstace(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstace()
export default axios
