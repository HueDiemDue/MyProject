import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { getLine } from '../utils/HelperLines';
let path = require('svg-path-properties');

const { width, height } = Dimensions.get('window');

const data = [
  {
    point1: { x: 350, y: 400 },
    point2: { x: 50, y: 300 },
    options: {
      type: 'Left',
    },
  },
  {
    point1: { x: 50, y: 300 },
    point2: { x: 300, y: 100 },
    options: {
      type: 'BoundedRight',
    },
  },
  {
    point1: { x: 50, y: 300 },
    point2: { x: 50, y: 100 },
    options: {
      type: 'BoundedLeft',
      distance: 125,
    },
  },
];

export default class BranchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
    };
    this.animatedValue = [];
  }

  componentDidMount() {
    this.createAllTree();
  }

  createAllTree() {
    const { data } = this.state;
    data.map((item, index) => {
      const { options, point1, point2 } = item;
      item.ref = index;
      const d = getLine(point1, point2, { ...options, ...{ radius: 40 } });
      item.d = d;
      const properties = path.svgPathProperties(d);
      const tl = properties.getTotalLength();
      const dashOffset = (tl | 0) * 2
      item.tl = tl
      item.dashOffset = dashOffset
      this.animatedValue.push(new Animated.Value(dashOffset))
    });
    this.setState({ data }, () => {
      this.startAnimation(this.createAnimation());
    });
  }

  createAnimation() {
    const { data } = this.state;
    return data.map((item, index) => {
      this.animatedValue[index].addListener(dashOffset => {
        this.refs[index].setNativeProps({
          strokeDashoffset: dashOffset.value,
        });
      });
      return Animated.timing(this.animatedValue[index], {
        toValue: item.tl,
        duration: 300,
        useNativeDriver: true,
      });
    });
  }

  startAnimation(animations) {
    Animated.sequence(animations).start(() => { });
  }

  render() {
    const { data } = this.state;
    return (
      <Svg
        width={width}
        height={height}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {data.map((item, index) => {
          return (
            <Path
              key={index}
              ref={index}
              d={item.d}
              strokeDasharray={[item.dashOffset, item.dashOffset]}
              strokeLinecap="round"
              strokeDashoffset={item.dashOffset}
              stroke={item.options.color || 'green'}
              strokeWidth={6}
              fill="none"
            />
          );
        })}
      </Svg>
    );
  }
}