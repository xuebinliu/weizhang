/**
 * Created by free on 8/16/16.
 *
 * 大厅页面
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackAndroid,
  ListView,
  Image,
  AsyncStorage,
} from 'react-native';

import {
  gstyles,
  NavigationBar,
  getCurrentCity,
  Location,
  LoadingView,
  UserInfo,
  DeviceStorage,
} from '../../header';

import HallDataMgr from './HallDataMgr.js';
import HallFilter from './HallFilter.js';
import * as Const from '../../const.js';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

// 当前用户列表缓存
let userCache = [];
// 过滤条件对象
var filterObj = {
  city:'',
  sex:2,
};

export default class Hall extends React.Component {
  constructor(props) {
    super(props);
    console.log('Hall constructor');

    this.state = {
      isLoading:true,
      peopleItems:dataSource.cloneWithRows(userCache),
    };

    this.initFilterData();
  }

  initFilterData= ()=>{
    const that = this;
    DeviceStorage.get(Const.SK_HALL_FILTER).then(function (obj) {
      if(obj) {
        filterObj = obj;
      }

      if(filterObj.city.length == 0) {
        // 获取当前城市
        that.cbRefreshCity();
      } else {
        // 刷新当前城市
        that.forceUpdate();
        // 首次拉取当前用户
        userCache = [];
        that.getPeopleList(0, filterObj);
      }
      console.log('initFilterData filterObj', filterObj);
    }).catch(function (err) {
      console.log('initFilterData filterObj catch err', err);
    });
  };

  saveFilterData= (newFilter)=>{
    filterObj = newFilter;
    DeviceStorage.save(Const.SK_HALL_FILTER, filterObj);
  };

  getPeopleList= (index, filterObj)=>{
    const that = this;
    HallDataMgr.getDefaultPeopleList(index, filterObj).then(function (data) {
      console.log('getPeopleList ok', data);

      userCache = [].concat(userCache, data);
      that.setState({
        isLoading:false,
        peopleItems:dataSource.cloneWithRows(userCache),
      });
    }).catch(function (error) {
      console.log('getPeopleList err', error);

      that.setState({
        isLoading:false,
        peopleItems:dataSource.cloneWithRows(userCache),
      });
    });
  };

  onClickCity= ()=>{
    const {navigator} = this.props;
    navigator.push({
      component: Location,
      cbRefreshCity:this.cbRefreshCity,
    });
  };

  onPressFilter= ()=>{
    const {navigator} = this.props;
    navigator.push({
      component: HallFilter,
      cbFilterChange:this.cbFilterChange,
    });
  };

  /**
   * 回调函数，过滤条件发生了变化
   */
  cbFilterChange= (sex)=>{
    console.log('cbFilterChange sex', sex);
    filterObj.sex = sex;
    DeviceStorage.save(Const.SK_HALL_FILTER, filterObj);

    // 重新加载用户列表
    this.reloadPeopleList();
  };

  /**
   * 刷新当前城市
   */
  cbRefreshCity= ()=> {
    const that = this;
    getCurrentCity().then((city)=>{
      filterObj.city = city;
      that.saveFilterData(filterObj);
      // 显示当前城市
      that.forceUpdate();
      // 重新加载用户列表
      that.reloadPeopleList();
    });
  };

  reloadPeopleList= ()=>{
    // 获取用户列表
    userCache = [];
    this.getPeopleList(0, filterObj);
  };

  onPressRow= (rowData)=>{
    const {navigator} = this.props;
    navigator.push({
      component: UserInfo,
      userData:rowData,
    });
  };

  renderItemImage= (rowData)=>{
    if(rowData.avatar_url && rowData.avatar_url.length > 0){
      return (<Image resizeMode='stretch' style={styles.itemImage} source={{uri:rowData.avatar_url}}/>);
    } else {
      return (<Image resizeMode='stretch' style={styles.itemImage} source={require('../../img/default_image.png')}/>);
    }
  };

  renderRow = (rowData, secId, rowId)=>{
    let user = rowData._serverData;
    // console.log('renderRow', user, secId, rowId);
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={()=>{this.onPressRow(rowData)}}>
        {this.renderItemImage(user)}
      </TouchableOpacity>
    );
  };

  renderListView() {
    if(this.state.isLoading) {
      return (<LoadingView/>);
    } else {
      return (
        <ListView
          contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}
          dataSource={this.state.peopleItems}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
      );
    }
  }

  render(){
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'同城'}
              leftButtonTitle={filterObj.city}
              leftButtonTitleColor={'#fff'}
              onLeftButtonPress={this.onClickCity}
              onRightButtonPress={this.onPressFilter}
              rightButtonIcon={'ios-funnel-outline'}/>
          <View style={gstyles.content}>
            {this.renderListView()}
          </View>
        </View>
    );
  }
}

const IMAGE_SIZE = (Dimensions.get('screen').width - 5*4)/2;
const styles = StyleSheet.create({
  itemContainer:{
    width:IMAGE_SIZE,
    height:IMAGE_SIZE,
    marginTop:5,
    marginHorizontal:5,
    borderRadius:3,
  },

  itemImage:{
    width:IMAGE_SIZE,
    height:IMAGE_SIZE,
    borderRadius:3,
  },
});
