
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

// AvatarView = Animatable.createAnimatableComponent(AvatarView)

export default class AvatarView extends Component {

  

  render() {
    return (
      <View style={{ width: 150, height: 150, justifyContent: 'center', alignItems: 'center' }}>
        < Animatable.View
          animation={this.props.animation}
          iterationCount={this.props.iterationCount}
          direction={this.props.direction}
          onAnimationEnd={
            () => {
              console.log('animated end')
            }
          }
          style={[{ width: 100, height: 100, backgroundColor: 'pink', borderRadius: 50, margin: 15, }, this.props.style]} />
        <Text style={{ color: 'blue' }}>{this.props.title}</Text>
      </View>
    );
  }
}
