import { AxiosRequestConfig } from '../types'
import { type } from 'os'
const strats = Object.create(null)
function defaultSart(val1: any, val2: any): any {
  return typeof val1 !== 'undefined' ? val2 : val1
}
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
const stratKeysFromVal2 = ['url', 'param', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)
  for (let key in config2) {
    mergeField(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    const strat = strats[key] || defaultSart
    config[key] = strat(config1[key], config2![key])
  }
  return config
}
