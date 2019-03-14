/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import ImageZoomInView from './animated/ZoomInView';
import SpringView from './animated/SpringView';
import Images from './assets/images';
import PulseView from './animated/PulseView';
import SvgComponent from './view/SvgComponent'
import BranchComponent from './trees/BranchComponent';
import _ from 'lodash'


const { width, height } = Dimensions.get('window');

const dataPoint = [
  {
    'id': 0,
    'x': 50,
    'y': 250,
    'isHidden': false,
  },
  {
    'id': 1,
    'x': 250,
    'y': 100,
    'isHidden': true
  },
  {
    'id': 3,
    'x': 250,
    'y': 400,
    'isHidden': true
  },
]

const options = {
  'type': 'Right',
  'radius': 40
}

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAnimated: false,
      dataBranch: dataPoint
    }
  }

  componentDidMount() {

  }

  onPress = () => {
    this.setState({
      isAnimated: true,
    })

  }

  changeData = (index) => {
    const { dataBranch } = this.state
    const position = parseInt(index) + 1
    if (position >= dataBranch.length) return
    if (!dataBranch[position].isHidden) return
    if (dataBranch[position].x === dataBranch[position + 1].x) {
      dataBranch[position].isHidden = false
      dataBranch[position + 1].isHidden = false
      this.setState({ dataBranch })
      return
    }
    dataBranch[position].isHidden = false
    this.setState({ dataBranch })
  }

  render() {
    const { isAnimated, dataBranch } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <BranchComponent
          // style={{ width: width, height: height }}
          data={dataBranch}
          options={options}
          isAnimated={isAnimated}
          changeData={this.changeData.bind(this)} />
        <View style={{ alignItems: 'center', position: 'absolute', justifyContent: 'center', left: 150 }}>
          <TouchableOpacity
            onPress={this.onPress}
            style={styles.buttons}>
            <Text>Touch Me</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttons: {
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderColor: 'red',
    borderWidth: 3,
    alignItems: 'center',
    marginTop: 220,
  }

});
