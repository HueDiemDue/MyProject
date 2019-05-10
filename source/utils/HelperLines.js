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

const getLine = (point1, point2, options) => {
  if (options.type === 'BoundedLeft') return branchLeftRoundedRect(point1, point2, options);
  if (options.type === 'BoundedRight') return branchRightRoundedRect(point1, point2, options)
  if (options.type === 'Left') return leftLineRect(point1, point2, options)
  if (options.type === 'Right') return rightRoundedRect(point1, point2, options)
  return null
}

export {
  getLine
}