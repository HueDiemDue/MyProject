import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Image } from 'react-native';
import Images from '../assets/images';

// sample blush 
export default class SpringView extends Component {

  constructor(props) {
    super(props)
    this.animatedValue = this.props.animated ? new Animated.Value(-10) : 100
    // this.borderValue = Animated.divide(this.animatedValue, 2)
  }

  componentDidMount() {
    if (this.props.animated) {
      this.startAnimated()
    }
  }

  startAnimated() {
    Animated.spring(this.animatedValue, {
      toValue: 10,
      friction: 5,
      duration: 1000
    }).start()
  }

  render() {
    return (
      <Animated.Image style={[styles.container,
      this.props.style,
      {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: this.animatedValue
      }]}
        source={this.props.source}>
      </Animated.Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  }
})