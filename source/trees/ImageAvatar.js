import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Image } from 'react-native';
import Images from '../assets/images';

class ImageAvatar extends Component {

  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.state = {
      startAnimated: false
    }
  }

  componentDidMount() {
    if (!this.props.data.isHidden) {
      this.startAnimated()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (nextProps.data.isHidden !== this.props.data.isHidden && !nextProps.data.isHidden) {
    //   this.startAnimated()
    // }
    return true
  }

  startAnimated() {
    const value = this.animatedValue.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [1, 1.5, 1]
    })
    this.animatedValue.addListener(() => {
      this.refs.img.setNativeProps({
        style: {
          transform:
            [
              { scaleX: value.__getAnimatedValue() },
              { scaleY: value.__getAnimatedValue() }
            ]
        },
      });
    });
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: this.props.data.time || 1000,
    }).start(() => {
      this.props.changeData(this.props.index)
    })
  }

  getFinishAnimated = () => {
    return this.state.isFinishAnimated
  }

  render() {
    const { style, source, } = this.props
    const { x, y, id, isHidden } = this.props.data

    console.log('x, y', x, y)
    return (
      <View
        key={id}
        style={{ top: y - 50, left: x - 50, opacity: isHidden ? 0 : 1, position: 'absolute' }}>
        <Animated.Image
          ref="img"
          style={[styles.container, style]}
          source={source} >
        </Animated.Image >
      </View>
    )
  }
}
export default ImageAvatarView = Animated.createAnimatedComponent(ImageAvatar);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50
  }
})