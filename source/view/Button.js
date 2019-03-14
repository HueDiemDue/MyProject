/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Button extends Component {

    constructor(props) {
        super(props)
    }

    // static getDerivedStateFromProps(props) {
    //     console.log('getDerivedStateFromProps ', props)
    //     return null
    // }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     console.log('getSnapshotBeforeUpdate ', prevProps, prevState)
    //     return null
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('componentDidUpdate ', prevProps, this.props)
    // }

    onPress = () => {
        if (this.props.onPress) {
            this.props.onPress()
        }
    }

    render() {
        console.log('render Button', this.props.color)
        return (
            <TouchableOpacity
                style={{ width: 200, height: 100, backgroundColor: this.props.color, justifyContent: 'center', alignItems: 'center' }}
                onPress={this.onPress}>
                <Text style={{ color: 'white' }}> On Press Me </Text>
            </TouchableOpacity>
        );
    }
}
