
import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ImageAvatar from './ImageAvatar';
import Images from '../assets/images'
import _ from 'lodash'
let path = require('svg-path-properties');

const { width, height } = Dimensions.get('window');

export default class BranchComponent extends React.Component {
  constructor(props) {
    super(props);
    const { options, data } = this.props
    const point1 = data[0]
    const point2 = data[1]
    const point3 = data[2]
    this.d1 = this.getLine(point1, point2, options)
    this.d2 = this.getLine(point1, point3, options)
    this.properties1 = path.svgPathProperties(this.d1);
    this.properties2 = path.svgPathProperties(this.d2);
    this.tl1 = this.properties1.getTotalLength();
    this.tl2 = this.properties2.getTotalLength();
    this.animateValue1 = new Animated.Value(900);
    this.animateValue2 = new Animated.Value(900);
  }

  componentDidMount() {
    // this.animate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextData = _.get(nextProps, 'data')
    const currData = _.get(this.props, 'data')
    console.log('shouldComponentUpdate ', nextProps)

    if (nextProps.isAnimated && !_.isEqual(nextData, currData)) {
      console.log('shouldComponentUpdate ', nextData)
      return false
      // this.animate()
    }
    return true
  }

  rightRoundedRect = (point1, point2, options) => {
    // options.radius = 40;
    return (
      'M' + point1.x + ',' + point1.y +
      'L' + point1.x + ' ' + (point2.y + options.radius) +
      'a' + options.radius + ',' + options.radius + ' 0 0 1 ' + options.radius + ',' + -options.radius +
      'L' + point2.x + ' ' + point2.y
    );
  };

  leftLineRect = (point1, point2, options) => {
    // const radius = 40
    return (
      'M' + point1.x + ',' + point1.y +
      'L' + point1.x + ' ' + (point2.y + options.radius) +
      'a' + options.radius + ',' + options.radius + ' 1 0 0 ' + -options.radius + ',' + -options.radius +
      'L' + point2.x + ' ' + point2.y
    )
  }

  branchLeftRoundedRect = (point1, point2, options) => {
    // const radius = 40
    return (
      'M' + point1.x + ',' + point1.y +
      'L' + point1.x + ' ' + ((point1.y - point2.y) / 2 + point2.y + options.radius) +
      'a' + options.radius + ',' + options.radius + ' 0 0 1 ' + options.radius + ',' + -options.radius +
      'L' + (oint1.x + options.distance - options.radius) + ' ' + ((point1.y - point2.y) / 2 + point2.y) +
      'a' + options.radius + ',' + options.radius + ' 0 0 0 ' + options.radius + ',' + -options.radius +
      'L' + (oint1.x + options.distance) + ' ' + (point2.y + options.radius) +
      'a' + options.radius + ',' + options.radius + ' 0 0 0 ' + -options.radius + ',' + -options.radius +
      'L' + point2.x + ' ' + point2.y
    )
  }

  branchRightRoundedRect = (point1, point2, options) => {
    // const radius = 40
    return (
      'M' + point1.x + ',' + point1.y +
      'L' + point1.x + ' ' + ((point1.y - point2.y) / 2 + point2.y + options.radius) +
      'a' + options.radius + ',' + options.radius + ' 0 0 1 ' + options.radius + ',' + -options.radius +
      'L' + ((point2.x - point1.x) / 2 + point1.x - options.radius) + ' ' + ((point1.y - point2.y) / 2 + point2.y) +
      'a' + options.radius + ',' + options.radius + ' 0 0 0 ' + options.radius + ',' + -options.radius +
      'L' + ((point2.x - point1.x) / 2 + point1.x) + ' ' + (point2.y + options.radius) +
      'a' + options.radius + ',' + options.radius + ' 0 0 1 ' + options.radius + ',' + -options.radius +
      'L' + point2.x + ' ' + point2.y
    )
  }

  getLine = (point1, point2, options) => {
    if (options.type === 'BoundedLeft') return this.branchLeftRoundedRect(point1, point2, options);
    if (options.type === 'BoundedRight') return this.branchRightRoundedRect(point1, point2, options)
    if (options.type === 'Left') return this.leftLineRect(point1, point2, options)
    if (options.type === 'Right') return this.rightRoundedRect(point1, point2, options)
    return null
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

  animate(index) {
    this.animateValue1.addListener(dashOffset => {
      this.refs.path1.setNativeProps({
        strokeDashoffset: dashOffset.value,
      });
    });
    this.animateValue2.addListener(dashOffset => {
      this.refs.path2.setNativeProps({
        strokeDashoffset: dashOffset.value,
      });
    });
    Animated.parallel([
      Animated.timing(this.animateValue1, {
        toValue: this.tl1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        this.props.changeData(index)
      }),
      Animated.timing(this.animateValue2, {
        toValue: this.tl2,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        this.props.changeData(index)
      })
    ]).start()

  }

  changeData = index => {
    this.animate(index)
  }

  renderImg() {
    const { data } = this.props
    return data.map((item, index) => {
      if (!item.isHidden) return <ImageAvatar
        key={item.id}
        data={item}
        index={index}
        source={Images.user}
        style={{ backgroundColor: 'green' }}
        changeData={this.changeData.bind(this)} />
      return null
    })
  }

  render() {
    const { isAnimated } = this.props

    return (
      <View style={this.props.style}>
        <Svg style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink' }} width={width} height={height}>
          <Path
            ref="path1"
            d={this.d1}
            strokeDasharray={[900, 900]}
            strokeLinecap="round"
            strokeDashoffset={899}
            stroke="green" strokeWidth={6} fill="none" />
          <Path
            ref="path2"
            d={this.d2}
            strokeDasharray={[900, 900]}
            strokeLinecap="round"
            strokeDashoffset={899}
            stroke="green" strokeWidth={6} fill="none" />
          {isAnimated ? this.renderImg() : null}
        </Svg>

      </View>

    );
  }
}