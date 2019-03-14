/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated } from 'react-native';
import Button from './Button'
import ViewComponent from './ViewComponent'
import AvatarView from './AvatarView';


export default class AppClone extends Component {

  constructor(props) {
    super(props)
    this.state = {
      color: 'red',
      xPosition: new Animated.Value(0)
    }
    this.onPress = this.onPress.bind(this)
  }

  componentDidMount() {
    Animated.timing(
      this.state.xPosition,
      {
        toValue: 100,
        duration: 1000
      }
    ).start()
    // scaleValue.setValue(0);
    // Animated.timing(scaleValue, {
    //   toValue: 1,
    //   duration: 250,
    //   useNativeDriver: true
    // }).start();
  }

  onPress = () => {
    console.log('onPress ', this.state.color)

    this.checkPromise().then(
      function (Success) {
        const a = 1;
        a = 3
        console.log('success ', Success)
      },
      function (error) {
        // khong hung duoc loi tu then tren gay ra 
        console.log('error ', error)
      })

    // this.checkPromise()
    //   .then(function (message) {
    //     const a = 1;
    //     a = 3
    //     console.log('message ', message)

    //   })
    //   .catch(function (error) {
    //     //  hung duoc loi trong then tren 
    //     console.log('error ', error)
    //   })

    // this.tryPromise()
    //   .then(success => {
    //     const a = 1
    //     a = 2
    //     console.log('success', success)
    //   })
    //   .catch(error => {
    //     // hung duoc loi o then truoc 
    //     console.log('error', error)
    //   })

    this.setState({ color: this.state.color === 'red' ? 'green' : 'red' })

  }

  checkPromise() {
    return new Promise((resolve, reject) => {
      // if (this.state.color !== 'red')
      return resolve('Success')
      // return reject('Error')
    })
    // return test
  }

  tryPromise() {
    if (this.state.color !== 'red')
      return Promise.resolve('return success')
    return Promise.reject('return fail')
  }

  render() {
    console.log('render')
    const { color } = this.state;

    return (
      <View style={styles.container}>
        {/* <Button color={color} onPress={this.onPress} />
        <ViewComponent /> */}
        < Animated.View
          style={{ width: 100, height: 100, backgroundColor: 'pink', borderRadius: 50, margin: 15, }}

        />

        <View style={{ flexDirection: 'row', margin: 20 }}>
          <AvatarView
            animation="slideInDown"
            iterationCount={9}
            direction="alternate" // alternate => interationCount !==2
            title='Address'
            style={{ backgroundColor: 'red', width: 50, height: 50, borderRadius: 5 }} />

          <AvatarView
            animation="pulse"
            iterationCount={100}
            direction="alternate"
            title='わたし' />
        </View>

        <View style={{ flexDirection: 'row', margin: 10 }}>
          <AvatarView
            animation="zoomIn"
            iterationCount={100}
            title='Friend' />

          {/* <AvatarView
            ref={ref => this.view = ref}
            animation="zoomOut"
            iterationCount={100}
            direction="normal"
            title='わたし*' /> */}

        </View>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
