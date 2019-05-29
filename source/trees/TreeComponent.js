import React from 'react';
import { View, StyleSheet, Animated, Dimensions, ScrollView, Image, SafeAreaView } from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { createAnimation } from '../utils/HelperTree';
import Images from '../assets/images';
const { width, height } = Dimensions.get('window');

const DURATION = 300
const TIME_DELAY = 100

export default class TreeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.animatedOffset = []
    this.animatedOpacity = []
    this.animatedOpacityUser = new Animated.Value(0)
  }

  componentDidMount() {
    this.initAnimations()
    Animated.timing(
      this.animatedOpacityUser,
      {
        toValue: 1,
        duration: DURATION,
      }
    ).start(() => {
      this.startAnimation(this.getAnimationsTree())
    })
  }

  render() {
    const { widthTree, heightTree, dataPath, dataPoint } = this.props
    return (
      <SafeAreaView>
        {/* <Image
          source={{ uri: 'https://picsum.photos/id/778/400/700' }}
          style={{ width: width, height: height }} /> */}
        <View style={{ position: 'absolute' }}>
          <ScrollView
            showsVerticalScrollIndicator={false}>
            <ScrollView
              horizontal
              ref={(ref) => this.myScroll = ref}
              showsHorizontalScrollIndicator={false}>
              <Svg width={widthTree} height={heightTree} style={{ justifyContent: 'center', alignItems: 'center', }}>
                {dataPath.map((item, index) => {
                  const { d, dashOffset } = item
                  return (
                    <Path
                      key={index}
                      ref={index}
                      d={d}
                      strokeDasharray={[dashOffset, dashOffset]}
                      strokeLinecap="round"
                      strokeDashoffset={dashOffset}
                      stroke={"#5294E2"}
                      strokeWidth={6}
                      fill="none"
                    />
                  )
                })}
              </Svg>
              <Animated.Image
                source={Images.avatar_boy}
                style={[
                  styles.img,
                  {
                    marginLeft: 310,
                    marginTop: 360,
                    opacity: this.animatedOpacityUser
                  }
                ]} />
              {
                dataPoint.map((item, index) => {
                  const { x, y, image } = item
                  return <Animated.Image
                    source={image}
                    key={index}
                    style={[styles.img, {
                      marginLeft: parseInt(x) - 40,
                      marginTop: parseInt(y) - 40,
                      opacity: this.animatedOpacity[index]
                    }]} />
                })
              }
            </ScrollView>
          </ScrollView>
        </View>
      </SafeAreaView>

    );
  }

  initAnimations() {
    const { dataPoint } = this.props
    dataPoint.map((item, index) => {
      this.animatedOpacity.push(new Animated.Value(0))
    })
  }

  getAnimationsTree() {
    const { dataPath, dataPoint } = this.props
    const arrayAnimations = []
    let index = 0
    let parent = 0
    while (index < dataPoint.length) {
      const arrayPoint = this.getAnimationsWithParent(parent, dataPoint, 'point')
      if (arrayPoint.length > 0) {
        arrayAnimations[parent] = Animated.parallel(arrayPoint)
      }
      parent++
      index += arrayPoint.length
    }
    parent = 0
    index = 0
    while (index < dataPath.length) {
      const arrayLine = this.getAnimationsWithParent(parent, dataPath, 'line')
      if (!arrayAnimations[parent]) {
        arrayAnimations[parent] = Animated.parallel(arrayLine)
      }
      parent++
      index += arrayLine.length
    }
    return arrayAnimations
  }

  getAnimationsWithParent(parent, data, type) {
    const array = data.filter((item) => { return item['parent'] === parent })
    const animations = []
    if (array.length > 0) {
      const delay = parent !== 0 ? TIME_DELAY : 0
      if (type === 'point') {
        array.map(item => {
          const { index } = item
          animations.push(createAnimation(this.animatedOpacity[index], 1, DURATION, delay))
        })
      }
      else {
        array.map(item => {
          const { index, dashOffset, tl } = item
          this.animatedOffset[index] = new Animated.Value(dashOffset)
          this.animatedOffset[index].addListener(dashOffset => {
            this.refs[index].setNativeProps({
              strokeDashoffset: dashOffset.value,
            });
          });
          animations.push(createAnimation(this.animatedOffset[index], tl, DURATION, delay))
        })
      }
    }
    return animations
  }

  startAnimation(animations) {
    Animated.sequence(animations).start()
  }

  scrollToPosition() {
    setTimeout(() => {
      this.myScroll.scrollTo({ x: this.props.width, y: 0, animated: false });
    }, 0.1);
  }
}

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
  }
})

