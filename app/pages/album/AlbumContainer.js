/**
 * Created by free on 11/8/16.
 *
 * 相册容器
 */

import React from 'react';
import{
    View,
    ListView,
    InteractionManager,
    StyleSheet,
    Alert,
} from 'react-native';

import AV from 'leancloud-storage';
import AlbumContainerItem from './AlbumContainerItem';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
    toastShort,
} from '../../header';

// 每行显示相册个数
const ALBUM_LINE_COUNT = 2;

var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class AlbumContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      items:this.getListItemData([]),
    };
  }

  componentDidMount() {
    const that = this;

    let album_id = AV.User.current().get('album_id');
    if(album_id) {
      // 获取相册
      var query = new AV.Query('Albums');
      query.get(album_id).then(function (albumObj) {
        that.setState({
          albums:that.getListItemData(albumObj.content)
        })
      }, function (error) {
        console.log('get album error', album_id, error);
      });
    }
    console.log('componentDidMount album_id', album_id);
  }

  getListItemData(content) {
    if(content.length == 0) {
      content.push([0]);
      return dataSource.cloneWithRows(content);
    }

    console.log('getListItemData content', content);

    content.unshift({addBtn:true});

    let items = [];
    let rowCount = parseInt(content.length / ALBUM_LINE_COUNT);
    for(let i=0; i<rowCount; i++){
      for(let j=0; j<ALBUM_LINE_COUNT; j++){
        items[i].push(content[i*ALBUM_LINE_COUNT+j]);
      }
    }

    let leftItemsCount = content.length % ALBUM_LINE_COUNT;
    for(let i=0; i<leftItemsCount; i++){
      items[rowCount].push(content[rowCount*ALBUM_LINE_COUNT+i]);
    }

    console.log('getListItemData items', items);

    return dataSource.cloneWithRows(items);
  }

  onBackHandle=()=> {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  // 添加相册
  onAddAlbum= ()=>{

  };

  // 编辑相册
  onEditAlbum= ()=>{

  };

  renderRow= (rowData, sectionId, rowId)=>{
    console.log('renderRow', rowData, sectionId, rowId);
    const {navigator} = this.props;
    let isAddBtn = (rowData.length==1 && rowData[0]==0) ? true : false;
    return <AlbumContainerItem isAddBtn={isAddBtn} isDel={false} navigator={navigator} rowData={rowData}/>;
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'相册'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
              rightButtonTitle={'编辑'}
              onRightButtonPress={this.onEditAlbum}
              rightButtonTitleColor={'white'}
          />

          <View style={gstyles.content}>
            <ListView
                dataSource={this.state.items}
                renderRow={this.renderRow}
            />
          </View>
        </View>
    );
  }
}