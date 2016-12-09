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

export default class AlbumContainerItem extends React.Component {
  constructor(props){
    super(props);

    console.log('AlbumContainerItem constructor');
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
        let content = albumObj.get('content');
        console.log('albumSettingChange get albumObj', content);

        // 相册已存在则覆盖修改的值，不存在则保存
        let isFind = false;
        for(let i=0; i<content.length; i++) {
          if(content[i].id == albumSetting.id) {
            content[i].name = albumSetting.name;
            content[i].power = albumSetting.power;
            isFind = true;
            console.log('albumSettingChange find&modify', content[i]);
            break;
          }
        }
        if(!isFind) {
          content.push(albumSetting);
        }

        console.log('albumSettingChange will save albumObj', content);

        // save to server
        albumObj.set('content', content);
        albumObj.save().then(function (obj) {
          console.log('albumSettingChange save albumObj ok', obj);
          // update ui
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
    console.log('renderItem0', this.props.rowData[0]);

    if(this.props.rowData[0].addBtn){
      // 渲染加号按钮
      return (
        <TouchableOpacity onPress={this.onAddAlbum} style={styles.addBtn}>
          <Ionicons name={"ios-add-outline"} size={60} color="blue" />
          <Text style={{color:'blue'}}>添加相册</Text>
        </TouchableOpacity>
      );
    } else {
      return(
        <View style={styles.itemView}>
          {this.renderItemImage(this.props.rowData[0])}
          <Text style={styles.itemName}>name</Text>
        </View>
      );
    }
  };

  // 渲染此行的第二个相册
  renderItem1= ()=>{
    console.log('renderItem1', this.props.rowData[1]);

    if(this.props.rowData[1]){
      return(
          <View style={styles.itemView}>
            {this.renderItemImage(this.props.rowData[1])}
            <Text style={styles.itemName}>name</Text>
          </View>
      );
    } else {

    }
  };

  renderItemImage= (rowData)=>{
    if(!rowData) {
      return;
    }

    console.log('renderItemImage rowData', rowData);

    if(rowData.coverage_url){

    } else {
      return (<Image resizeMode='stretch' style={styles.itemImage} source={require('../../img/default_image.png')}/>);
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

  addBtn:{
    width:(Dimensions.get('screen').width - 20*4)/2,
    height:(Dimensions.get('screen').width - 20*4)/2 + 40,
    margin:20,
    backgroundColor:"#ffffff",
    borderWidth:1,
    borderColor:'#dddddd',
    justifyContent:'center',
    alignItems:'center',
  },

  itemView:{
    width:(Dimensions.get('screen').width - 20*4)/2,
    height:(Dimensions.get('screen').width - 20*4)/2 + 40,
    margin:20,
    backgroundColor:"#ffffff",
  },

  itemImage:{
    width:(Dimensions.get('screen').width - 20*4)/2,
    height:(Dimensions.get('screen').width - 20*4)/2 + 40,
  },

  itemName:{
    fontSize:16,
    color:'red',
  },

});
