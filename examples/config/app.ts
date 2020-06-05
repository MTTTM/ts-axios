import axios, { AxiosTransformer } from '../../src/tsaxios'
import { QUOTE_STRING_MODE } from 'highlight.js';
import { type } from 'os';

// axios.defaults.headers.common["test2"]=123;
// axios.defaults.headers.post["postHeader"]="post";
// axios.defaults.headers.get["getHeader"]="get";
// axios({
//   method: 'post',
//   url: '/base/post',
//   headers:{
//      test:"test"
//   },
//   data: {
//     a: 'config',
//     b: 2
//   }
// }).then((res) => {
//   console.log(res)
// })


// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

axios({
  transformRequest:[function(data){
    return JSON.stringify(data);
  },...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse:[...(axios.defaults.transformResponse as AxiosTransformer[]),function(data){
    if(typeof data =='object'){
      data.b="2";
    }
    return data;
  }],
  method: 'post',
  url: '/base/post',
  headers:{
     test:"test"
  },
  data: {
    a: 'config',
  }
}).then((res) => {
  console.log(res)
})