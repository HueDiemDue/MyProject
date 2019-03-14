
import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ImageZoomInView from '../animated/ZoomInView'
let path = require('svg-path-properties');

const { width, height } = Dimensions.get('window');

export default class SvgComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dRight = this.branchLineR(50, 300, 300, 100)
    this.dLeft = this.branchLineF(50, 300, 50, 100)
    this.propertiesRight = path.svgPathProperties(this.dRight);
    this.propertiesLeft = path.svgPathProperties(this.dLeft);
    this.tlRight = this.propertiesRight.getTotalLength();
    this.tlLeft = this.propertiesLeft.getTotalLength();

    this.animateValue1 = new Animated.Value(900);
    this.animateValue2 = new Animated.Value(900);
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.animate();
  }

  rightRoundedRect = (x1, y1, x2, y2) => {
    const radius = 40;

    return (
      'M' + x1 + ',' + y1 +
      'L' + x1 + ' ' + (y2 + radius) +
      'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
      'L' + x2 + ' ' + y2
    );
  };

  leftLineRect = (x1, y1, x2, y2) => {
    const radius = 40
    return (
      'M' + x1 + ',' + y1 +
      'L' + x1 + ' ' + (y2 + radius) +
      'a' + radius + ',' + radius + ' 1 0 0 ' + -radius + ',' + -radius +
      'L' + x2 + ' ' + y2
    )
  }

  branchLineF = (x1, y1, x2, y2) => {
    const radius = 40
    return (
      'M' + x1 + ',' + y1 +
      'L' + x1 + ' ' + ((y1 - y2) / 2 + y2 + radius) +
      'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
      'L' + (x1 + 125 - radius) + ' ' + ((y1 - y2) / 2 + y2) +
      'a' + radius + ',' + radius + ' 0 0 0 ' + radius + ',' + -radius +
      'L' + (x1 + 125) + ' ' + (y2 + radius) +
      'a' + radius + ',' + radius + ' 0 0 0 ' + -radius + ',' + -radius +
      'L' + x2 + ' ' + y2
    )
  }

  branchLineR = (x1, y1, x2, y2) => {
    const radius = 40
    return (
      'M' + x1 + ',' + y1 +
      'L' + x1 + ' ' + ((y1 - y2) / 2 + y2 + radius) +
      'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
      'L' + ((x2 - x1) / 2 + x1 - radius) + ' ' + ((y1 - y2) / 2 + y2) +
      'a' + radius + ',' + radius + ' 0 0 0 ' + radius + ',' + -radius +
      'L' + ((x2 - x1) / 2 + x1) + ' ' + (y2 + radius) +
      'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
      'L' + x2 + ' ' + y2
    )
  }


  getPointAlLengthWithRotation = (path, length) => {
    let p1 = path.getPointAtLength(length);
    let p2 = path.getPointAtLength(length + 3);
    let deg = Math.atan2(p1.y - p2.y, p1.x - p2.x) * (180 / Math.PI);
    return {
      x: p1.x,
      y: p1.y,
      angle: deg,
    };
  };

  animate() {
    this.animateValue1.addListener(dashOffset => {
      this.refs.pathRight.setNativeProps({
        strokeDashoffset: dashOffset.value,
      });
    });
    this.animateValue2.addListener(dashOffset => {
      this.refs.pathLeft.setNativeProps({
        strokeDashoffset: dashOffset.value,
      });
    });
    Animated.sequence([
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.parallel([
        Animated.timing(this.animateValue1, {
          toValue: this.tlRightChild,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(this.animateValue2, {
          toValue: this.tlLeftChild,
          duration: 800,
          useNativeDriver: true,
        })
      ])

    ]).start()
  }

  render() {
    const scaleXChange = this.animatedValue.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [1, 1.5, 1]
    })
    const scaleYChange = this.animatedValue.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [1, 2, 1]
    })
    return (
      <View style={{ flex: 1 }}>
        <Svg width={width} height={height} style={{ justifyContent: 'center', alignItems: 'center' }} >
          <Path
            ref="pathRight"
            d={this.dRight}
            strokeDasharray={[900, 900]}
            strokeLinecap="round"
            strokeDashoffset={899}
            stroke="green" strokeWidth={6} fill="none" />
          <Path
            ref="pathLeft"
            d={this.dLeft}
            strokeDasharray={[900, 900]}
            strokeLinecap="round"
            strokeDashoffset={899}
            stroke="green" strokeWidth={6} fill="none" />
        </Svg>
        <View style={{ flex: 1, position: 'absolute', marginTop: 250 }}>
          <ImageZoomInView animatedValue={this.animatedValue} style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            transform: [
              { scaleX: scaleXChange },
              { scaleY: scaleXChange }
            ],
          }}
          />
        </View>

      </View>
    );
  }
}