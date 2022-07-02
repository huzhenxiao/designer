import qs from 'qs';
import { get, post } from './request';

// 获取点位列表
export function getPointList(data) {
  return post('/api/iot/item', qs.stringify(data), {
    'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  });
}

// 获取点位报警上下限(多个)
export function getPointParseAlarm(params) {
  return get('/api/iot/item/sensorAlert', params);
}

// 获取第三方数据源
export function getThirdData(url, code, startTime, endTime) {
  return get('/napi/iot/getThirdUrlData', {
    url,
    code,
    startTime,
    endTime
  });
}

// 获取单个点位的实时数据
export function getPointRealData(params) {
  return get('/api/iot/item/realData', params);
}

// 获取单个点位的实时数据
export function batchGetPointStat(data) {
  return post('/api/iot/item/realDataList', data);
}

// 获取点位报警上下限(多个)
export function getPointWarningLimits(code, sensor_id) {
  return get('/api/iot/item/sensorAlert', { code, sensor_id });
}
