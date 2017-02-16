/**
 * Created by free on 8/16/16.
 *
 * 私信页面
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  BaseListViewComponent,
} from '../../header';

import AV from 'leancloud-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

let talkCache = [];

export default class Message extends BaseListViewComponent {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    talkCache = [];
    this.loadData(talkCache.length);
  }

  /**
   * 从服务器获取列表数据
   * @param index 其实位置
   */
  loadData= (index)=>{
    var query = AV.Status.inboxQuery(AV.User.current());
    query.find().then(function(statuses){
      //查询成功，返回状态列表，每个对象都是 AV.Status
    }, function(err){
      //查询失败
      console.dir(err);
    });
  };

  onPressRow= (rowData)=>{
    // this.props.navigator.push({
    //   component:UserInfo,
    //   userData:rowData,
    // });
  };

  renderRow= (rowData, sectionID, rowID)=>{
    return (
        <TouchableOpacity onPress={()=>this.onPressRow(rowData)}>
          <View style={{flex:1, flexDirection:'row', height:80, alignItems:'center'}}>
            <View style={{flex:1}}>
              <Text>'ss'</Text>
              <Text>'sss'</Text>
            </View>
            <Ionicons name="ios-arrow-forward" size={20} color="gray" style={{marginHorizontal:10}}/>
          </View>
        </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
});