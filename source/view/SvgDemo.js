
import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
let path = require('svg-path-properties');

const { width, height } = Dimensions.get('window');

export default class SvgDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dRight = this.branchLineFR(50, 400, 200, 200)
    this.dLeftChild = this.leftLineRect(200, 160, 50, 50);
    this.dRightChild = this.rightRoundedRect(200, 160, 350, 50);
    // this.arrayAnimated = [
    //   { 'value': this.dRight, 'name': 'pathRight' },
    //   { 'value': this.dRightChild, 'name': 'pathRightChild' },
    //   { 'value': this.dLeftChild, 'name': 'pathLeftChild' }];
    // this.arrayAnimated.map(item => {
    //   item.properties = path.svgPathProperties(item.value)
    //   item.animated = new Animated.Value(800)
    //   item.tl = path.svgPathProperties(item.value).getTotalLength()
    // })
    this.propertiesRight = path.svgPathProperties(this.dRight);
    this.propertiesRightChild = path.svgPathProperties(this.dRightChild);
    this.propertiesLeftChild = path.svgPathProperties(this.dLeftChild);
    this.tlRight = this.propertiesRight.getTotalLength();
    this.tlRightChild = this.propertiesRightChild.getTotalLength();
    this.tlLeftChild = this.propertiesLeftChild.getTotalLength();

    this.animateValue1 = new Animated.Value(800);
    this.animateValue2 = new Animated.Value(800);
    this.animateValue3 = new Animated.Value(800);
  }

  componentDidMount() {
    // this.animate();
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

  branchLineFR = (x1, y1, x2, y2) => {
    const radius = 40
    return (
      'M' + x1 + ',' + y1 +
      'L' + x1 + ' ' + (y2 + radius) +
      'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
      'L' + (x2 - radius) + ' ' + y2 +
      'a' + radius + ',' + radius + ' 0 0 0 ' + radius + ',' + -radius 
      // 'L' + (x2 -radius) + ' ' + y2
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
    // let l = 0;
    // setInterval(() => {
    //   l += 1;
    //   if (l > this.tl) l = 0;
    //   let p = this.getPointAlLengthWithRotation(this.properties, l);
    //   let angle = p.angle + 180;
    //   this.refs.polygonRef.setNativeProps({
    //     transform: [
    //       { translateX: p.x },
    //       { translateY: p.y },
    //       { rotate: `${angle}deg` },
    //     ],
    //   });
    // }, 10);
    // this.arrayAnimated.map(item => {
    //   item.animated.addListener(dashOffset => {
    //     this.refs.item['name'].setNativeProps({
    //       strokeDashoffset: dashOffset.value,
    //     });
    //   });
    // })
    // this.arrayAnimated.map(item => {

    // })
    this.animateValue1.addListener(dashOffset => {
      this.refs.pathRight.setNativeProps({
        strokeDashoffset: dashOffset.value,
      });
    });
    this.animateValue2.addListener(dashOffset => {
      this.refs.pathRightChild.setNativeProps({
        strokeDashoffset: dashOffset.value,
      });
    });
    this.animateValue3.addListener(dashOffset => {
      this.refs.pathLeftChild.setNativeProps({
        strokeDashoffset: dashOffset.value,
      });
    });
    Animated.sequence([
      Animated.timing(this.animateValue1, {
        toValue: this.tlRight,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(this.animateValue2, {
          toValue: this.tlRightChild,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(this.animateValue3, {
          toValue: this.tlLeftChild,
          duration: 500,
          useNativeDriver: true,
        })
      ])
    ]).start(() => {

    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
        <Svg width={width} height={height} style={{ marginTop: 500 }} >
          {/* <SvgPath
            ref="path"
            d={this.d}
            fill="none"
            stroke="grey"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDashoffset={699}
            strokeDasharray={[700, 700]}
          />
          <SvgPath ref="polygonRef" d="M-5 -5 L5 0L-5 5z" fill="green" /> */}
          <Path
            ref="pathRight"
            d={this.dRight}
            // strokeDasharray={[800, 800]}
            // strokeLinecap="round"
            // strokeDashoffset={799}
            stroke="green" strokeWidth={6} fill="none" />
          {/* <Path
            ref="pathRightChild"
            d={this.dRightChild}
            strokeDasharray={[800, 800]}
            strokeLinecap="round"
            strokeDashoffset={799}
            stroke="green" strokeWidth={6} fill="none" />
          <Path
            ref="pathLeftChild"
            d={this.dLeftChild}
            strokeDasharray={[800, 800]}
            strokeLinecap="round"
            strokeDashoffset={799}
            stroke="green" strokeWidth={6} fill="none" /> */}
        </Svg>
      </View>
    );
  }
}