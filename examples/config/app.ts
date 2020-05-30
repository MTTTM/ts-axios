import axios from '../../src/tsaxios'

axios.defaults.headers.common["test2"]=123;
axios.defaults.headers.post["postHeader"]="post";
axios.defaults.headers.get["getHeader"]="get";
axios({
  method: 'post',
  url: '/base/post',
  headers:{
     test:"test"
  },
  data: {
    a: 'config',
    b: 2
  }
}).then((res) => {
  console.log(res)
})


axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})