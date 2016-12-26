/**
 * Created by free on 8/16/16.
 *
 * 大厅页面
 */
import React from 'react';
import {
  View,
  InteractionManager,
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
} from '../../header';

import HallDataMgr from './HallDataMgr.js';


const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let userCache;

export default class Hall extends React.Component {
  constructor(props) {
    super(props);

    userCache = [];
    this.state = {
      city:'未知',
      showFilterDialog:false,
      isLoading:true,
      peopleItems:dataSource.cloneWithRows(userCache),
    };
  }

  componentDidMount(){
    // 获取当前城市
    this.refreshCity();

    // 获取当前城市的人
    this.getPeopleList(userCache.length);

    BackAndroid.addEventListener('hardwareBackPress', this.onBackHandler);
  }

  componentWillMount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackHandler);
  }

  getPeopleList= (index)=>{
    const that = this;
    HallDataMgr.getDefaultPeopleList(index).then(function (data) {
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
      refreshCity:this.refreshCity,
    });
  };

  onPressFilter= ()=>{
    this.setState({
      showFilterDialog:true,
    });
    this.forceUpdate();
  };

  /**
   * 弹框时，截获触摸事件
   * @param evt
   * @returns {boolean}
   */
  onStartShouldSetResponderCapture= (evt)=>{
    if(this.state.showFilterDialog) {
      if(evt.pageY < DIALOG_TOP || evt.pageY > DIALOG_TOP + DIALOG_HEIGHT) {
        // 点击的Y坐标不在弹框范围内，执行拦截
        return true;
      }
    }
    return false;
  };

  /**
   * 刷新当前城市
   */
  refreshCity= ()=> {
    console.log('refreshCity current', this.state.city);
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

  onPressDialogBtn= (isOk)=>{
    this.setState({
      showFilterDialog:false,
    });

    if(isOk) {
      this.getPeopleList(userCache.length);
    }
  };

  onPressRow= (rowData)=>{

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
        <View style={gstyles.container} onStartShouldSetResponderCapture={this.onStartShouldSetResponderCapture}>
          <NavigationBar
              title={'同城'}
              leftButtonTitle={this.state.city}
              leftButtonTitleColor={'#fff'}
              onLeftButtonPress={this.onClickCity}
              onRightButtonPress={this.onPressFilter}
              rightButtonIcon={'md-add'}
          />

          <View style={[gstyles.content,]}>
            {this.renderListView()}
          </View>

          {this.renderFilterDialog()}

        </View>
    );
  }

  /**
   * 过滤对话框
   * @returns {XML}
   */
  renderFilterDialog= ()=>{
    console.log('renderFilterDialog state', this.state.showFilterDialog);
    if(this.state.showFilterDialog) {
      return (
        <View style={styles.dialogContainer}>
          <View style={styles.dialogTitleView}>
            <Text style={styles.dialogBtnText}>过滤</Text>
          </View>

          <View style={{flex:1}}/>

          <View style={{flexDirection:'row', height:40, backgroundColor:'darkgrey'}}>
            <TouchableOpacity onPress={()=>this.onPressDialogBtn(false)} style={styles.dialogBtn}>
              <Text style={styles.dialogBtnText}>取消</Text>
            </TouchableOpacity>
            <View style={{height:40, width:1, backgroundColor:'white'}}/>
            <TouchableOpacity onPress={()=>this.onPressDialogBtn(true)} style={styles.dialogBtn}>
              <Text style={styles.dialogBtnText}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
}

const DIALOG_HEIGHT = 300;
const DIALOG_MARGIN = 20;
const DIALOG_TOP = Dimensions.get('window').height/2 - DIALOG_HEIGHT/2;
const DIALOG_WIDTH = Dimensions.get('window').width - DIALOG_MARGIN*2;
const IMAGE_SIZE = (Dimensions.get('screen').width - 5*4)/2;
const styles = StyleSheet.create({
  itemContainer:{
    width:IMAGE_SIZE,
    height:IMAGE_SIZE,
    marginTop:5,
    marginHorizontal:5,
    borderRadius:2,
  },

  itemImage:{
    width:IMAGE_SIZE,
    height:IMAGE_SIZE,
    borderRadius:2,
  },

  dialogContainer:{
    position:'absolute',
    flexDirection:'column',
    borderRadius:10,
    margin:DIALOG_MARGIN,
    left:0,
    top:DIALOG_TOP,
    width:DIALOG_WIDTH,
    height:DIALOG_HEIGHT,
    backgroundColor:'#ececec',
  },

  dialogTitleView:{
    width:DIALOG_WIDTH,
    height:40,
    backgroundColor:'dimgray',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    justifyContent:'center',
    alignItems:'center',
  },

  dialogBtn:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },

  dialogBtnText:{
    fontSize:16,
    color:'white'
  }

});
