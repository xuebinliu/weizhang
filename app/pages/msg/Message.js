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
  NativeModules,
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

    console.log('Message constructor');
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
    console.log('Message loadData');

    AV.User.currentAsync().then(function (currentUser) {
      console.log('Message get currentUser id', currentUser.id);
      NativeModules.ReactProxy.getChatLocalList(currentUser.id, function (chatList) {
        console.log('loadData', chatList);
      });
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