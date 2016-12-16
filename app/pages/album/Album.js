/**
 * Created by free on 11/8/16.
 *
 * 一个相册
 */

import React from 'react';
import{
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ListView,
  NativeModules,
} from 'react-native';

import {
  gstyles,
  NavigationBar,
  naviGoBack,
  loaderHandler,
} from '../../header';

import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AV from 'leancloud-storage';

import AlbumSetting from './AlbumSetting';

// 照片间距
const IMAGE_MARGIN = 5;
// 相册大小（正方形）,根据屏幕宽度计算
let imageSize = (Dimensions.get('screen').width - IMAGE_MARGIN*6)/3;

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Album extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      items:this.getListItemData([]),
    };
  }

  getListItemData(content) {
    console.log('getListItemData content', content);

    // TODO: 查看别人相册不显示加号
    content.unshift({addBtn:true});

    return dataSource.cloneWithRows(content);
  }

  onBackHandle=()=> {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  /**
   * 修改相册参数回调函数
   * @param settingData
   * @param isDel
   */
  albumSettingChange= (settingData, isDel)=>{
    const {route} = this.props;
    route.albumSettingChange(settingData, isDel);

    // 如果删除相册，则直接返回上级页面
    if(isDel) {
      this.onBackHandle();
    }
  };

  /**
   * 打开相册设置
   */
  onAlbumSetting= ()=>{
    const {navigator, route} = this.props;
    navigator.push({
      component:AlbumSetting,
      settingData:route.settingData,
      albumSettingChange:this.albumSettingChange,
    });
  };

  onAddPicture= ()=>{
    const that = this;

    ImagePicker.openPicker({
      multiple:true,
      maxFiles:10
    }).then((images)=>{
      console.log('onAddPicture', images);

      // 上传前，显示加载框
      loaderHandler.showLoader('正在上传...');

      for(let image of images) {
        // save to server via native
        console.log('start upload image path=', image.path);
        NativeModules.FileUpload.upload(image.path, function (error, url) {
          console.log('end upload image url=', url);
          if(!error){
            return;
          }

          // 更新当前界面
          that.forceUpdate();

        });
      }
    }).catch((e)=>{
    });
  };

  onOpenPicture= ()=>{

  };

  renderRow= (rowData, sectionId, rowId)=>{
    console.log('renderRow', rowData, sectionId, rowId);

    if(rowData.addBtn == true) {
      return (
          // render add button
          <TouchableOpacity onPress={this.onAddPicture} style={styles.addBtn}>
            <Ionicons name={"ios-add-outline"} size={60} color="blue" />
          </TouchableOpacity>
      );
    } else {
      return (
          // render picture
          <TouchableOpacity>
            <Image/>
          </TouchableOpacity>
      );
    }
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

          <View style={gstyles.content}>
            <ListView
                contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}
                dataSource={this.state.items}
                renderRow={this.renderRow}
                enableEmptySections={true}
            />
          </View>

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