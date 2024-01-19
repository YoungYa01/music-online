import axios from 'axios'
import {getToken} from "../utils/auth";
import cache from "../utils/cache";
import errorCode from "../utils/errorCode";
import {message} from "antd";
import {saveAs} from 'file-saver'

// 是否显示重新登录
export const isRelogin = {show: false};
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url;                  // 请求地址
      const s_data = sessionObj.data;                // 请求数据
      const s_time = sessionObj.time;                // 请求时间
      const interval = 1000;                         // 间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交';
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }
  return config
}, error => {
  console.error(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code: number = res.data.code || 200;
    // 获取错误信息
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        message.info("登录状态已过期");
        // MessageBox.confirm
        // ('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   isRelogin.show = false;
        //   store.dispatch('LogOut').then(() => {
        //     location.href = '/index';
        //   })
        // }).catch(() => {
        //   isRelogin.show = false;
        // });
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      message.error(msg);
      // Message({message: msg, type: 'error'})
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      message.warning(msg);
      // Message({message: msg, type: 'warning'})
      return Promise.reject('error')
    } else if (code !== 200) {
      message.error(msg);
      // Notification.error({title: msg})
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.error('err' + error)
    let {message} = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    // Message({message: message, type: 'error', duration: 5 * 1000})
    return Promise.reject(error)
  }
)

// 通用下载方法
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function download(url, params, filename, config) {
  message.loading('正在下载数据，请稍候', 2500)
  // downloadLoadingInstance = Loading.service({
  //   text: "正在下载数据，请稍候",
  //   spinner: "el-icon-loading",
  //   background: "rgba(0, 0, 0, 0.7)",
  // })
  return service.post(url, params, {
    transformRequest: [(params) => {
      return tansParams(params)
    }],
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    responseType: 'blob',
    ...config
  }).then(async (data) => {
    const isBlob = blobValidate(data);
    if (isBlob) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const blob = new Blob([data])
      saveAs(blob, filename)
    } else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
      message.error(errMsg);
    }
    // downloadLoadingInstance.close();
  }).catch((r) => {
    console.error(r)
    message.error('下载文件出现错误，请联系管理员！')
    // downloadLoadingInstance.close();
  })
}

function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {//处理参数为对象的情况
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            const params = propName + '[' + key + ']';
            const subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function blobValidate(data: axios.AxiosResponse<any>) {
  return data.type !== 'application/json'
}


export default service
