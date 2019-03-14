import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Image, Easing } from 'react-native';
import Images from '../assets/images';

class PulseImg extends Component {

  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.state = {
      opacity: 1
    }

  }

  componentDidMount() {
    if (this.props.animated) {
      this.startAnimated()
    }
  }

  startAnimated() {
    this.animatedValue.setValue(0)
    Animated.timing(this.animatedValue, {
      toValue: 1.5,
      duration: 2000,
      easing: Easing.linear,
    }).start(() => {
      // this.setState({ opacity: 0 })
    })

  }

  render() {
    // pulse

    const moving = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1, 1.5],
      outputRange: [0, 10, 0, 10]
    })
    return (
      < Animated.Image style={
        [styles.container,
        styles.img, { marginTop: moving, opacity: this.state.opacity }]}
        source={Images.user}
      >
      </Animated.Image >
    )
  }
}
export default PulseView = Animated.createAnimatedComponent(PulseImg);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    borderWidth: 2,
    borderColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
})