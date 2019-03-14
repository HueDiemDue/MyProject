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

export default class ViewComponent extends React.PureComponent {

    render() {
        console.log('re-render view ')
        return (
            <View style={[{ width: 200, height: 200, backgroundColor: 'pink' }]}>

            </View>
        );
    }
}
