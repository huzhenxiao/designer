import axios from "axios";
import { ElMessage } from 'element-plus'
import {responseCodeMsgMap} from './config'

export const service = axios.create({
  baseURL: "",
});
service.defaults.withCredentials = false;

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error)=> {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if ((res.code === 200 || res.code === 1000000 || res.code === undefined) && res.status === 200) {
      return res;
    } else {
      ElMessage({
        message: responseCodeMsgMap[res.code] || res.msg,
        type: "error",
        duration: 5 * 1000,
      });
    }
  },
  (error) => {
    const errMsg = error.response?.data?.msg;
    ElMessage({
      message: errMsg || error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export function get(url, params) {
  return new Promise((resolve, reject) => {
    service({
      method: "get",
      url,
      params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function post(
  url,
  params,
  headers = { "Content-Type": "application/json;charset=UTF-8" }
) {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url,
      data: params,
      headers,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function put(
  url,
  params,
  headers = { "Content-Type": "application/json;charset=UTF-8" }
) {
  return new Promise((resolve, reject) => {
    service({
      method: "put",
      url,
      data: params,
      headers,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function del(
  url,
  params,
  headers = { "Content-Type": "application/json;charset=UTF-8" }
) {
  return new Promise((resolve, reject) => {
    service({
      method: "delete",
      url,
      data: params,
      headers,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function patch(
  url,
  params,
  headers = { "Content-Type": "application/json;charset=UTF-8" }
) {
  return new Promise((resolve, reject) => {
    service({
      method: "patch",
      url,
      data: params,
      headers,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default {
  get,
  post,
  put,
  patch,
  del,
};
