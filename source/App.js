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
import BranchComponent from './trees/BranchComponent';

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <BranchComponent />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
