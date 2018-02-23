import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class OfferRide extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text> Ecanul oferire cursa </Text>
            </View>
        );
    }
}

export default OfferRide;
