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
import Album from './Album';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AV from 'leancloud-storage';

// 相册大小（正方形）,根据屏幕宽度计算
let imageSize = (Dimensions.get('screen').width - 20*4)/2;

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

  /**
   * 获取相册权限提示文字
   * @param power
   * @returns {*}
   */
  getAlbumPower= (power)=> {
    if(power == 0) {
      return '不限制访问';
    } else if(power == 1) {
      return '付费访问';
    } else if(power == 2) {
      return '禁止其他人访问';
    } else {
      return '未知';
    }
  };

  /**
   * 打开相册
   * @param itemData
   */
  openAlbum= (itemData)=>{
    console.log('openAlbum rowData=', itemData);

    const {navigator} = this.props;
    navigator.push({
      component:Album,
      itemData:itemData,
    });

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
      let itemData = this.props.rowData[0];
      return(
          <TouchableOpacity onPress={()=>{this.openAlbum(itemData)}} style={styles.itemView}>
            {this.renderItemImage(itemData)}
            <Text style={styles.itemName}>{itemData.name}</Text>
            <Text style={styles.itemName}>{this.getAlbumPower(itemData.power)}</Text>
          </TouchableOpacity>
      );
    }
  };

  // 渲染此行的第二个相册
  renderItem1= ()=>{
    console.log('renderItem1', this.props.rowData[1]);

    let itemData = this.props.rowData[1];
    if(this.props.rowData[1]){
      return(
          <TouchableOpacity onPress={()=>{this.openAlbum(itemData)}} style={styles.itemView}>
            {this.renderItemImage(itemData)}
            <Text style={styles.itemName}>{itemData.name}</Text>
            <Text style={styles.itemName}>{this.getAlbumPower(itemData.power)}</Text>
          </TouchableOpacity>
      );
    }
  };

  renderItemImage= (itemData)=>{
    console.log('renderItemImage rowData', itemData);
    if(!itemData) {
      return;
    }

    if(itemData.coverage_url){
      return (<Image resizeMode='stretch' style={{width:imageSize, height:imageSize,alignSelf:'center'}} source={{uri:itemData.coverage_url}}/>);
    } else {
      return (<Ionicons name="ios-image" size={imageSize} style={{alignSelf:'center'}} color="coral"/>);
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
    width:imageSize,
    height:imageSize + 40,
    margin:20,
    backgroundColor:"#ffffff",
    borderWidth:1,
    borderColor:'#dddddd',
    justifyContent:'center',
    alignItems:'center',
  },

  itemView:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    width:imageSize,
    height:imageSize + 40,
    margin:20,
    backgroundColor:"#ffffff",
  },

  itemImage:{
    alignSelf:'center',
  },

  itemName:{
    fontSize:16,
  },

});
