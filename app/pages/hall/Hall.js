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
} from 'react-native';

import {
  gstyles,
  NavigationBar,
  getCurrentCity,
  Location,
  LoadingView,
  UserInfo,
} from '../../header';

import HallDataMgr from './HallDataMgr.js';
import HallFilter from './HallFilter.js';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let userCache;

export default class Hall extends React.Component {
  constructor(props) {
    super(props);

    userCache = [];
    this.state = {
      city:'',
      isLoading:true,
      peopleItems:dataSource.cloneWithRows(userCache),
    };
  }

  componentDidMount(){
    // 获取当前城市
    this.cbRefreshCity();

    // 获取当前城市的人
    this.getPeopleList(userCache.length);

    BackAndroid.addEventListener('hardwareBackPress', this.onBackHandler);
  }

  componentWillMount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackHandler);
  }

  getPeopleList= (index)=>{
    const that = this;
    HallDataMgr.getDefaultPeopleList(index, this.state.city).then(function (data) {
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
      cbReloadHall:this.cbReloadHall,
    });
  };

  /**
   * 回调函数，重新加载大厅数据
   */
  cbReloadHall= (sex)=>{
    this.getPeopleList(0, );
  };

  /**
   * 刷新当前城市
   */
  cbRefreshCity= ()=> {
    console.log('cbRefreshCity current', this.state.city);
    const that = this;
    getCurrentCity().then((city)=>{
      that.setState({
        city:city
      });
    });
  };

  /**
   * android处理返回按键
   * @returns {boolean}
   */
  onBackHandler= ()=>{
    if(this.state.showFilterDialog) {
      // 如果显示了过滤对话框，则隐藏框
      this.setState({
        showFilterDialog:false,
      });
      // 消化掉back按键
      return true;
    }
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
    console.log('renderRow', user, secId, rowId);
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
              leftButtonTitle={this.state.city}
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
