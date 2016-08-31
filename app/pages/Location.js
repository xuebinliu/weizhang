/**
 * Created by free on 8/24/16.
 *
 * 位置信息, 选择用户当前的城市
 */

import React from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {toastShort} from '../utils/ToastUtil';

import NavigationBar from '../widget/TabNavigator';
import {naviGoBack, getCityList} from '../utils/common';

import gstyles from '../gstyles';

import LoadingView from '../widget/LoadingView';

import DeviceStorage from '../utils/Storage';
import {SK_CURR_CITY} from '../const/StorageKey';

export default class Location extends React.Component {

  constructor(props){
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.onPressRow = this.onPressRow.bind(this);

    this.renderListView = this.renderListView.bind(this);

  }

  componentWillMount() {
    this.props = {
        isLoading : true
    };
  }

  componentDidMount() {
    getCityList((cities) => {
      let ds = new ListView.DataSource({
        rowHasChanged:(r1, r2)=> r1 !== r2,
        sectionHeaderHasChanged:(s1, s2)=> s1!== s2,
      });

      // 数据加载完成
      this.props.isLoading = false;

      // 触发下一次绘制
      this.setState({
        dataSource : ds.cloneWithRowsAndSections(cities)
      });
    });
  }

  onBackHandle() {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onPressRow(rowData) {
    toastShort('已切换到 '+rowData);

    DeviceStorage.save(SK_CURR_CITY, rowData);

    setTimeout(()=>this.onBackHandle(), 500);
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableHighlight style={styles.listItemContainer} underlayColor='rgba(24,36,35,0.1)' onPress={() => this.onPressRow(rowData)}>
        <Text style={styles.listItemText}>{rowData}</Text>
      </TouchableHighlight>
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return (
        <View style={gstyles.line}></View>
    );
  }

  renderSectionHeader(sectionData, sectionId) {
    return (
      <View style={styles.listHeaderContainer}>
        <Text style={styles.listHeaderText}>{sectionId}</Text>
      </View>
    );
  }

  renderListView() {
    if(!this.props.isLoading) {
      return (
          <View style={gstyles.content}>
            <ListView
                initialListSize={10}
                pageSize={20}
                dataSource={this.state.dataSource}
                renderSectionHeader={this.renderSectionHeader}
                renderSeparator={this.renderSeparator}
                renderLoading
                renderRow={this.renderRow}/>
          </View>
      );
    } else {
      return (<LoadingView/>);
    }
  }

  render(){
    return(
        <View style={gstyles.container}>

          <NavigationBar
              title={'选择城市'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
          />

          {this.renderListView()}

        </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer:{
    marginHorizontal:8,
  },
  listItemText:{
    marginVertical:8,
    fontSize:14
  },
  listHeaderContainer:{
    flex:1,
    height:30,
    backgroundColor:'whitesmoke',
    justifyContent:'center',
    alignItems:'center'
  },
  listHeaderText:{
    fontSize:16,
    fontWeight:'bold'
  },

});