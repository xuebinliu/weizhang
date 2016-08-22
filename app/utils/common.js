/**
 * Created by free on 8/16/16.
 */

import {BD_MAP_IP_URL} from '../const';

export function naviGoBack(navigator) {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
}

export function isEmptyObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}

// 根据当前IP获取所在城市
export async function getCurrentCity(callback) {
  try {
    let response = await fetch(BD_MAP_IP_URL);
    let json = await response.json();
    console.log(json);
    callback(json.content.address_detail.city);
  } catch (error) {
    console.log(error);
    callback('error');
  }
}