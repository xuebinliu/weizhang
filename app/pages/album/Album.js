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
  ListView,
  PixelRatio,
  NativeModules,
} from 'react-native';

import {
  gstyles,
  NavigationBar,
  naviGoBack,
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

  componentDidMount() {

  }

  getListItemData(content) {
    console.log('getListItemData content', content);

    // TODO: 查看别人相册不显示加号
    content.unshift({addBtn:true});
    content.unshift({addBtn:true});
    content.unshift({addBtn:true});
    content.unshift({addBtn:true});

    return dataSource.cloneWithRows(content);
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
    const that = this;
    //
    // ImagePicker.openPicker({
    //   width: parseInt(60 * PixelRatio.get()),
    //   height: parseInt(60 * PixelRatio.get()),
    //   cropping: true
    // }).then((image)=>{
    //   // 上传前，显示加载框
    //   loaderHandler.showLoader('正在上传...');
    //
    //   // save to server via native
    //   NativeModules.FileUpload.upload(image.path, function (error, url) {
    //     // 取消加载框
    //     DeviceEventEmitter.emit('changeLoadingEffect', {isVisible: false});
    //
    //     // 头像上传成功后，把url地址保存到User中
    //     AV.User.current().set('avatar_url', url);
    //     AV.User.current().save();
    //
    //     // 更新当前界面
    //     that.forceUpdate();
    //
    //     // 更新我的界面
    //     const {route} = that.props;
    //     route.callback();
    //
    //     toastShort('更改头像成功');
    //
    //     console.log("onModifyHead url=", url);
    //   });
    // }).catch((e)=>{
    //   // 取消加载框
    //   loaderHandler.hideLoader();
    //   toastShort('更改头像失败');
    // });
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