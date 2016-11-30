/**
 * Created by free on 11/8/16.
 *
 * 相册容器中的一个item
 */
import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';

import AlbumSetting from './AlbumSetting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AV from 'leancloud-storage';

export default class Album extends React.Component {
  constructor(props){
    super(props);
  }

  // 点击添加相册按钮
  onAddAlbum= ()=>{
    console.log('onAddAlbum');
    const {navigator} = this.props;
    navigator.push({
      component:AlbumSetting,
      isCreate:true,
      power:0,
      albumTitle:"请输入相册标题",
      albumSettingChange:this.albumSettingChange,
    });
  };

  /**
   * 相册状态变化的回调
   * @param albumSetting
   */
  albumSettingChange= (albumSetting)=>{
    console.log('albumSettingChange albumSetting', albumSetting);

    const that = this;

    // 保存这个相册到服务器
    let album_id = AV.User.current().get('album_id');
    console.log('albumSettingChange get album_id', album_id);
    if(album_id) {
      // 相册存在，获取相册对象Albums
      var queryAlbums = new AV.Query('Albums');
      queryAlbums.get(album_id).then(function (albumObj) {
        console.log('albumSettingChange get albumObj', albumObj.content);

        if(!albumObj.content) {
          albumObj.content = [];
        }

        // 相册已存在则覆盖修改的值，不存在则保存
        let isFind = false;
        for(let i=0; i<albumObj.content.length; i++) {
          if(albumObj.content[i].id == albumSetting.id) {
            albumObj.content[i].name = albumSetting.name;
            albumObj.content[i].power = albumSetting.power;
            isFind = true;
            console.log('albumSettingChange find&modify', albumObj.content[i]);
            break;
          }
        }
        if(!isFind) {
          albumObj.content.push(albumSetting);
        }

        console.log('albumSettingChange will save albumObj', albumObj.content);

        // save
        albumObj.save().then(function (obj) {
          console.log('albumSettingChange save albumObj ok', obj.content);
          that.props.refresh();
        }, function (error) {
          console.log('albumSettingChange save albumObj error', error);
        });
      }, function (error) {
        console.log('albumSettingChange get album error', album_id, error);
      });
    }
  };

  // 渲染此行的第一个相册
  renderItem0= ()=>{
    if(this.props.rowData[0].addBtn){
      // 渲染加号按钮
      return (
        <TouchableOpacity onPress={this.onAddAlbum} style={[styles.itemView, {borderWidth:1, borderColor:'#dddddd'}]}>
          <Ionicons name={"ios-add-outline"} size={60} color="blue" />
          <Text style={{color:'blue'}}>添加相册</Text>
        </TouchableOpacity>
      );
    } else {

    }
  };

  // 渲染此行的第二个相册
  renderItem1= ()=>{
    if(this.props.rowData[1]){
      return(<View style={styles.itemView}/>);
    } else {

    }
  };

  render(){
    return (
        <View style={styles.container}>
          {this.renderItem0()}
          {this.renderItem1()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    height:200,
  },

  itemView:{
    width:(Dimensions.get('screen').width - 20*3)/2,
    margin:20,
    backgroundColor:"#ffffff",
    alignItems:'center',
    justifyContent:'center',
  }
});
