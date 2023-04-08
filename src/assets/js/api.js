import axios from 'axios';
import { ElNotification } from 'element-plus';
const { create, isCancel } = axios,
  /* 添加在页面中切换接口环境 start */
  NODE_ENV =
  process.env.NODE_ENV !== 'production' ? 'dev' : 'prod',

  baseURL = {
    dev: '/dev',
    prod: window.location.origin || 'https://www.gomefinance.com.cn'
  }[NODE_ENV],

  // 创建新的axios实例
  httpRequest = create({
    baseURL, // 默认路径
    timeout: 60000 // 默认超时时间
  }),

  customErrorHandler = ({ data, config })=> {
    ElNotification.error({
      message: `请求错误 (Code: ${data.code})`,
      description: `${data.msg} (${config.url})`,
      customClass: 'break-all'
    });
  },
  /**
 * Handle standard HTTP errors
 */
  standardErrorHandler = (error) => {
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
    // 请求未到达 Gateway
      ElNotification.error({
        message: error.code === 'ECONNABORTED' ? 'connection timeout' : 'network error',
        description: `${error?.message} (${error?.config?.url})`,
        customClass: 'break-all'
      });
    } else {
    // 请求已到达 Gateway
      ElNotification.error({
        message: `status code：${error?.response?.status}`,
        description: `${error?.response?.statusText} (${error?.response?.config?.url})`,
        customClass: 'break-all'
      });
    }
  };

httpRequest.interceptors.response.use(
  async (response) => {
    if (response.data.code === 2000) {
      return Promise.resolve(response.data.data);
    }
    customErrorHandler(response);
    return Promise.reject(response);
  },
  (error) => {
    // Error caused by filtering active cancellation requests
    if (!isCancel(error)) {
      standardErrorHandler(error);
    }

    return Promise.reject(error);
  }
);

export default httpRequest;