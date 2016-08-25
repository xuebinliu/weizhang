/**
 * Created by free on 8/16/16.
 */


import DeviceStorage from './Storage';
import {SK_CURR_CITY} from '../const/StorageKey';

import {BD_MAP_IP_URL} from '../const';
import {CITIES} from '../const/City';

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
    let city = await DeviceStorage.get(SK_CURR_CITY);
    if(city){
      console.log('from cache city=' + city);
      callback(city);
    } else {
      let response = await fetch(BD_MAP_IP_URL);
      let json = await response.json();

      let city = json.content.address_detail.city;
      callback(city);
      DeviceStorage.save(SK_CURR_CITY, city);

      console.log('from baidu city=' + city);
    }
  } catch (error) {
    console.log('getCurrentCity err=' + error);
    callback('未知');
  }
}

// 获取城市列表,包含了当前用户所在城市
export async function getCityList(callback) {
  try {
    getCurrentCity((city)=>{
      CITIES.当前[0]=city;
      callback(CITIES);
    });
  } catch (error) {
    console.log('getCityList err=' + error);
  }
}