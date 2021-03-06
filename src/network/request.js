import axios from 'axios'

export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  // 2. axios的拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 拦截成功后需要再返回出去
    // 什么时候使用拦截器
    // 1. config中的一些信息不符合服务器要求
    // 2. 每次发送网络请求时，在界面中显示一个请求图标
    // 3. 某些网络请求(比如登录)，必须携带一些特殊的信息(登录中的token)
    
    return config
  }, err => {
    console.log(err);
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })

  // 发送真正的网络请求
  return instance(config)
}

