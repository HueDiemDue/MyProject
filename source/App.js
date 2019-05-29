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
import TreeComponent from './trees/TreeComponent';
import { getMaxY, getMaxX, convertDataPath } from '../source/utils/HelperTree';
import Images from '../source/assets/images';
const { width, height } = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthTree: 0,
      heightTree: 0,
      dataPath: dataPath,
      dataPoint: dataPoint
    }
  }

  componentDidMount() {
    this.updateData()
  }

  render() {
    const { widthTree, heightTree, dataPath, dataPoint } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <TreeComponent
          widthTree={widthTree}
          heightTree={heightTree}
          dataPath={dataPath}
          dataPoint={dataPoint} />
      </SafeAreaView>
    );
  }

  updateData() {
    const { dataPath, dataPoint } = this.state
    const widthTree = getMaxX(dataPoint)
    const maxY = getMaxY(dataPoint)
    const heightTree = maxY > height ? maxY : height
    const newDataPath = convertDataPath(dataPath)
    dataPoint.map((item, index) => {
      item.index = index
    })
    this.setState({
      dataPath: newDataPath,
      dataPoint,
      widthTree,
      heightTree
    })
  }
}

const dataPath = [
  {
    point1: { x: 150, y: 400 },
    point2: { x: 350, y: 350 },
    parent: 1,
    options: {
      type: 'Right',
    }
  },
  {
    point1: { x: 350, y: 400 },
    point2: { x: 50, y: 300 },
    parent: 1,
    options: {
      type: 'Left',
    }
  },
  {
    point1: { x: 350, y: 400 },
    point2: { x: 500, y: 300 },
    parent: 1,
    options: {
      type: 'Right',
    }
  },
  {
    point1: { x: 50, y: 300 },
    point2: { x: 300, y: 100 },
    parent: 3,
    options: {
      type: 'BoundedRight',
    }
  },
  {
    point1: { x: 50, y: 300 },
    point2: { x: 50, y: 100 },
    parent: 3,
    options: {
      type: 'BoundedLeft',
      distance: 125,
    }
  },
]

const dataPoint = [
  {
    x: 150,
    y: 400,
    parent: 0,
    image: Images.avatar_girl
  },
  {
    x: 50,
    y: 300,
    parent: 2,
    image: Images.avatar_dad
  },
  {
    x: 500,
    y: 300,
    parent: 2,
    image: Images.avatar_mom
  },
  {
    x: 300,
    y: 100,
    parent: 4,
    image: Images.avatar_gm
  },
  {
    x: 50,
    y: 100,
    parent: 4,
    image: Images.avatar_gf
  },
]
// convert data TO ARRAY dataPoint with choose point 2 of item
