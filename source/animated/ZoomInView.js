import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Image } from 'react-native';
import Images from '../assets/images';

class ImageZoomIn extends Component {

  constructor(props) {
    super(props)
    this.animatedValue = this.props.animated ? new Animated.Value(0) : 100
    // this.borderValue = Animated.divide(this.animatedValue, 2)
    this.state = {

    }
  }

  componentDidMount() {
    // if (this.props.animated) {
    //   this.startAnimated()
    // }
  }

  startAnimated() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: this.props.time || 1000,
    }).start()

  }

  render() {
    // max -> min  
    // min -> max use time toValue and borderValue
    // const sizeChange = this.props.animatedValue.interpolate({
    //   inputRange: [0, 0.2, 1],
    //   outputRange: [0, 140, 100]
    // })
    // const radiuschange = this.props.animatedValue.interpolate({
    //   inputRange: [0, 0.2, 1],
    //   outputRange: [0, 70, 50]
    // })

    return (
      <Animated.Image style={
        [styles.container,
        this.props.style]}
        source={Images.user} >
      </Animated.Image >
    )
  }
}
export default ImageZoomInView = Animated.createAnimatedComponent(ImageZoomIn);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  }
})