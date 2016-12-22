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
  Modal,
  BackAndroid,
} from 'react-native';

import {
  gstyles,
  NavigationBar,
  getCurrentCity,
  Location,
} from '../../header';

export default class Hall extends React.Component {
  constructor(props) {
    super(props);

    this.onClickCity = this.onClickCity.bind(this);
    this.onClickFilter = this.onClickFilter.bind(this);

    this.state = {
      city:'未知',
      showFilterDialog:false,
    };
  }

  onClickCity(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: Location,
        refreshCity:this.refreshCity,
      });
    });
  };

  onClickFilter(){
    this.setState({
      showFilterDialog:true,
    });
  }

  componentDidMount(){
    this.refreshCity();

    BackAndroid.addEventListener('hardwareBackPress', this.onBackHandler);
  }

  componentWillMount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackHandler);
  }

  onStartShouldSetResponderCapture= (evt)=>{
    if(this.state.showFilterDialog) {
      return true;
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

  render(){
    return (
        <View style={gstyles.container} onStartShouldSetResponderCapture={this.onStartShouldSetResponderCapture}>
          <NavigationBar
              title={'同城'}
              leftButtonTitle={this.state.city}
              leftButtonTitleColor={'#fff'}
              onLeftButtonPress={this.onClickCity}
              onRightButtonPress={this.onClickFilter}
              rightButtonIcon={'md-add'}
          />

          <View style={[gstyles.content, {backgroundColor:'white',}]}>
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
    if(this.state.showFilterDialog) {
      return (
        <View style={styles.filterDialogContainer}>
          <View style={styles.titleView}>
            <Text style={{color:'white', fontSize:15}}>过滤</Text>
          </View>

        </View>
      );
    }
  };
}

const FILTER_DIALOG_HEIGHT = 300;
const FILTER_DIALOG_MARGIN = 20;
const DIALOG_WIDTH = Dimensions.get('screen').width - FILTER_DIALOG_MARGIN*2;
const styles = StyleSheet.create({
  filterDialogContainer:{
    position:'absolute',
    flexDirection:'column',
    borderRadius:10,
    margin:FILTER_DIALOG_MARGIN,
    top:Dimensions.get('screen').height/2 - FILTER_DIALOG_HEIGHT/2,
    left:0,
    width:DIALOG_WIDTH,
    height:FILTER_DIALOG_HEIGHT,
    backgroundColor:'#ececec',
  },

  titleView:{
    width:DIALOG_WIDTH,
    height:40,
    backgroundColor:'dimgray',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    justifyContent:'center',
    alignItems:'center',
  },

});
