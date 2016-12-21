/**
 * Created by free on 8/16/16.
 */
import DeviceStorage from './Storage';

import {BD_MAP_IP_URL, SK_CURR_CITY, CITIES} from '../const';

export function naviGoBack(navigator) {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
}

// 根据当前IP获取所在城市
export async function getCurrentCity() {
  try {
    let city = await DeviceStorage.get(SK_CURR_CITY);
    if(city){
      console.log('getCurrentCity from cache', city);
      return city;
    } else {
      let response = await fetch(BD_MAP_IP_URL);
      let json = await response.json();
      let city = json.content.address_detail.city;

      // 存储
      DeviceStorage.save(SK_CURR_CITY, city);
      console.log('getCurrentCity from baidu', city);
      return city;
    }
  } catch (error) {
    return '未知';
  }
}

// 获取城市列表,包含了当前用户所在城市
export function getCityList() {
  return new Promise(function (resolve, reject) {
    getCurrentCity().then((city)=>{
      CITIES.当前[0]=city;
      resolve(CITIES);
    }).catch(function (error) {
      reject(error);
    });
  });
}