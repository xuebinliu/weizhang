/**
 * Created by free on 11/8/16.
 *
 * 相册容器
 */
import React from 'react';
import{
    View,
    ListView,
    StyleSheet,
} from 'react-native';

import AV from 'leancloud-storage';
import AlbumContainerItem from './AlbumContainerItem';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
} from '../../header';

var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

/**
 * 可以查看自己的相册和他人的相册，只有查看自己的相册时，可以添加新相册
 */
export default class AlbumContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      items:this.getListItemData([]),
    };
  }

  componentDidMount() {
    this.loadAlbums();
  }

  // TODO 加载对应用户的相册
  loadAlbums() {
    const that = this;
    let album_id = AV.User.current().get('album_id');

    console.log('loadAlbums album_id', album_id);

    if(album_id) {
      // 相册存在，获取相册
      var query = new AV.Query('Albums');
      query.get(album_id).then(function (albumObj) {
        let content = albumObj.get('content');
        console.log('loadAlbums get albumObj content', content);
        if(content) {
          that.setState({
            items:that.getListItemData(content)
          })
        }
      }, function (error) {
        console.log('loadAlbums: get album error', album_id, error);
      });
    } else {
      // 相册不存在，相册对象Albums，并创建一个空相册放入content中
      var Albums = AV.Object.extend('Albums');
      var albumObj = new Albums();
      albumObj.set('content', []);
      albumObj.save().then(function (albumObj) {
        // 保存相册id到user中
        AV.User.current().set('album_id', albumObj.id);
        AV.User.current().save();
      }, function (error) {
        console.error(error);
      });
    }
  }

  getListItemData(content) {
    console.log('getListItemData content', content);

    // 查看自己相册时，显示加号
    content.unshift({addBtn:true});

    // 每行显示两个相册，所以对原相册对象进行分组，两个一组
    let items = [];
    let rowCount = parseInt(content.length / 2);
    for(let i=0; i<=rowCount; i++){
      if(content[i*2+1]) {
        items.push([content[i*2], content[i*2+1]]);
      } else {
        items.push([content[i*2]]);
      }
    }

    console.log('getListItemData items', items);

    return dataSource.cloneWithRows(items);
  }

  onBackHandle=()=> {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  // 当相册改变状态时，刷新相册容器
  onRefresh= ()=>{
    console.log('onRefresh');
    this.loadAlbums();
  };

  renderRow= (rowData, sectionId, rowId)=>{
    console.log('renderRow', rowData, sectionId, rowId);

    // 渲染一个相册容器的item
    const {navigator} = this.props;
    return <AlbumContainerItem
              refresh={this.onRefresh}
              navigator={navigator}
              rowData={rowData}/>;
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'相册'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <View style={gstyles.content}>
            <ListView
                dataSource={this.state.items}
                renderRow={this.renderRow}
                enableEmptySections={true}
            />
          </View>
        </View>
    );
  }
}