/**
 * Created by free on 11/8/16.
 *
 * 一个相册
 */

import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
} from '../../header';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AV from 'leancloud-storage';

import AlbumSetting from './AlbumSetting';

// 照片间距
let IMAGE_MARGIN = 5;
// 相册大小（正方形）,根据屏幕宽度计算
let imageSize = (Dimensions.get('screen').width - IMAGE_MARGIN*6)/3;

export default class Album extends React.Component {

  constructor(props){
    super(props);

  }

  componentDidMount() {

  }

  onBackHandle=()=> {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onAlbumSetting= ()=>{
    const {navigator, route} = this.props;
    navigator.push({
      component:AlbumSetting,
      isCreate:false,
      power:route.itemData.power,
      albumTitle:route.itemData.name,
      albumSettingChange:this.albumSettingChange,
    });
  };

  onAddPicture= ()=>{

  };

  renderAddBtn= ()=>{
    return (
        <TouchableOpacity onPress={this.onAddPicture} style={styles.addBtn}>
          <Ionicons name={"ios-add-outline"} size={60} color="blue" />
        </TouchableOpacity>
    );
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'相册'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
              rightButtonTitle='设置'
              onRightButtonPress={this.onAlbumSetting}
              rightButtonTitleColor={'white'}
          />

        </View>
    );
  }
}

const styles = StyleSheet.create({
  addBtn:{
    width:imageSize,
    height:imageSize,
    margin:IMAGE_MARGIN,
    backgroundColor:"#ffffff",
    borderWidth:1,
    borderColor:'#dddddd',
    justifyContent:'center',
    alignItems:'center',
  },

});