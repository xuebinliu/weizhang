/**
 * Created by free on 12/22/16.
 */


import AV from 'leancloud-storage';

export default class HallDataMgr {


  /**
   * 从服务器获取用户列表
   * @param index 其实索引，用于分页
   * @param city 城市过滤
   * @param sex 性别过滤
   * @param hot 热度(点击一次热度加1)
   *
   */
  static getDefaultPeopleList(index, city, sex, hot) {
    console.log('getDefaultPeopleList index=', index);

    return new Promise(function (resolve, reject) {
      var query = new AV.Query('_User');

      if(city && city.length > 0) {
        query.contains('city', city);
      }

      if(sex && sex != -1) {
        query.equalTo('sex', sex);
      }

      if(hot && hot != -1) {

      }

      // 最多返回 10 条结果
      query.limit(30);
      // 选定返回字段
      // query.select(['nickname:', 'mind', 'avatar_url']);
      // 跳过 20 条结果
      // query.skip(20);
      // 按时间，升序排列
      // query.ascending('createdAt');
      // 按时间，降序排列
      // query.descending('createdAt');

      query.find().then(function (data) {
        return resolve(data);
      }).catch(function (error) {
        reject(error);
      });
    });


  }


}