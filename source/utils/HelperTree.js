import { Animated } from 'react-native';
let path = require('svg-path-properties');

const rightRoundedRect = (point1, point2, options) => {
  const { radius } = options

  return (
    'M' + point1.x + ',' + point1.y +
    'L' + point1.x + ' ' + (point2.y + radius) +
    'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
    'L' + point2.x + ' ' + point2.y
  )
};

const leftLineRect = (point1, point2, options) => {
  const { radius } = options

  return (
    'M' + point1.x + ',' + point1.y +
    'L' + point1.x + ' ' + (point2.y + radius) +
    'a' + radius + ',' + radius + ' 1 0 0 ' + -radius + ',' + -radius +
    'L' + point2.x + ' ' + point2.y
  )
}

const branchLeftRoundedRect = (point1, point2, options) => {
  const { radius, distance } = options

  return (
    'M' + point1.x + ',' + point1.y +
    'L' + point1.x + ' ' + ((point1.y - point2.y) / 2 + point2.y + radius) +
    'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
    'L' + (point1.x + distance - radius) + ' ' + ((point1.y - point2.y) / 2 + point2.y) +
    'a' + radius + ',' + radius + ' 0 0 0 ' + radius + ',' + -radius +
    'L' + (point1.x + distance) + ' ' + (point2.y + radius) +
    'a' + radius + ',' + radius + ' 0 0 0 ' + -radius + ',' + -radius +
    'L' + point2.x + ' ' + point2.y
  )
}

const branchRightRoundedRect = (point1, point2, options) => {
  const { radius } = options

  return (
    'M' + point1.x + ',' + point1.y +
    'L' + point1.x + ' ' + ((point1.y - point2.y) / 2 + point2.y + radius) +
    'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
    'L' + ((point2.x - point1.x) / 2 + point1.x - radius) + ' ' + ((point1.y - point2.y) / 2 + point2.y) +
    'a' + radius + ',' + radius + ' 0 0 0 ' + radius + ',' + -radius +
    'L' + ((point2.x - point1.x) / 2 + point1.x) + ' ' + (point2.y + radius) +
    'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius +
    'L' + point2.x + ' ' + point2.y
  )
}

const lineStraight = (point1, point2) => {
  return (
    'M' + point1.x + ',' + point1.y +
    'L' + point2.x + ' ' + point2.y)
}

const getLine = (point1, point2, options) => {
  if (options.type === 'BoundedLeft') return branchLeftRoundedRect(point1, point2, options);
  if (options.type === 'BoundedRight') return branchRightRoundedRect(point1, point2, options)
  if (options.type === 'Left') return leftLineRect(point1, point2, options)
  if (options.type === 'Right') return rightRoundedRect(point1, point2, options)
  if (options.type === 'Straight') return lineStraight(point1, point2)
  return null
}

const getMaxY = array => {
  let maxY = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].y > maxY) maxY = array[i].y
  }
  return maxY + 50
}

const getMaxX = array => {
  let maxX = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].x > maxX) maxX = array[i].x
  }
  return maxX + 50
}

const convertDataPath = array => {
  if (array.length === 0) return array
  array.map((item, index) => {
    const { options, point1, point2 } = item
    item.ref = index
    const d = getLine(point1, point2, { ...options, ...{ radius: 40 } })
    item.d = d
    const properties = path.svgPathProperties(d)
    const tl = properties.getTotalLength()
    const dashOffset = (tl | 0) * 2
    item.tl = tl
    item.index = index
    item.dashOffset = dashOffset
  })
  return array
}

const createAnimation = (animation, value, duration, delay) => {
  return Animated.timing(
    animation,
    {
      toValue: value,
      duration: duration,
      useNativeDriver: true,
      delay: delay
    }
  )
}
// from dataPath => dataPoint

export {
  getLine,
  getMaxY,
  getMaxX,
  convertDataPath,
  createAnimation
  // getAnimationsWithParent
}