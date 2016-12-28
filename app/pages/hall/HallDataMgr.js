/**
 * Created by free on 12/22/16.
 */


import AV from 'leancloud-storage';

export default class HallDataMgr {

  /**
   * 从服务器获取用户列表
   * @param index 其实索引，用于分页
   * @param filterObj {
   *                    city 城市过滤
   *                    sex  性别过滤
   *                  }
   *
   */
  static getDefaultPeopleList(index, filterObj) {
    console.log('getDefaultPeopleList index', index, 'filterObj', filterObj);

    return new Promise(function (resolve, reject) {
      var query = new AV.Query('_User');

      if(filterObj.city && filterObj.city.length > 0) {
        // 当前城市
        query.contains('city', filterObj.city);
      }

      // 指定性别 0男 1女
      if(filterObj.hot != -1) {
        query.equalTo('sex', filterObj.sex);
      }

      // 热度排序 0降序 1升序
      if(filterObj.hot == 0) {
        query.descending('hot');
      } else if(filterObj.hot == 1) {
        query.ascending('hot');
      } else {
      }

      // 时间排序 0降序 1升序
      if(filterObj.time == 0) {
        query.descending('createdAt');
      } else if(filterObj.time == 1) {
        query.ascending('createdAt');
      } else {
      }

      // 最多返回 10 条结果
      query.limit(20);

      // 选定返回字段
      // query.select(['nickname:', 'mind', 'avatar_url']);

      query.find().then(function (data) {
        return resolve(data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }


}