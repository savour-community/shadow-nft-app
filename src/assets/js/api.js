import axios from 'axios';

/* 添加在页面中切换接口环境 start */
const NODE_ENV =
  process.env.NODE_ENV !== 'production' ? 'dev' : 'prod',

  baseURL = {
    dev: '/dev',
    prod: window.location.origin || 'https://www.gomefinance.com.cn'
  }[NODE_ENV],

  // 创建新的axios实例
  httpRequest = axios.create({
    baseURL, // 默认路径
    timeout: 60000 // 默认超时时间
  });

export default httpRequest;