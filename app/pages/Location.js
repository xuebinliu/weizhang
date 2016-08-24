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
} from 'react-native';

import NavigationBar from '../widget/TabNavigator';
import {naviGoBack} from '../utils/common';

import LoadingView from '../widget/LoadingView';

import gstyles from '../gstyles';

import {CITYS, tests} from '../const';

let dataSource;

export default class Location extends React.Component {

  constructor(props){
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);

    let ds = new ListView.DataSource({
      rowHasChanged:(r1, r2)=> r1 !== r2,
      sectionHeaderHasChanged:(s1, s2)=> s1!== s2,
    });

    console.log(tests);

    this.state = {
      dataSource : ds.cloneWithRowsAndSections(tests)
    };
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  onBackHandle() {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  renderRow(rowData, sectionId, rowId) {
    return (
        <Text>{rowData}</Text>
    );
  }

  renderSectionHeader(sectionData, sectionId) {
    return (
      <Text>{sectionId}</Text>
    );
  }

  render(){
    return(
        <View style={gstyles.container}>

          <NavigationBar
              title={'城市'}
              leftButtonIcon="ios-arrow-round-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <View style={gstyles.content}>

            <ListView
                initialListSize={1}
                dataSource={this.state.dataSource}
                renderSectionHeader={this.renderSectionHeader}
                renderRow={this.renderRow}/>

          </View>

        </View>
    );
  }

}