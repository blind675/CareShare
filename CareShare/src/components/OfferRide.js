import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import SwitchSelector from 'react-native-switch-selector';
import { connect } from 'react-redux';

import * as actions from '../actions';

class OfferRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departureTime: 'now',
            direction: 'work-home',
            carPlaces: 3,
        };
    }

    render() {
        const options = [
            { label: 'Work -> Home', value: 'work-home' },
            { label: 'Home -> Work', value: 'home-work' }
        ];

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text> Ecanul oferire cursa </Text>
                <View
                    style={{
                        padding: 10,
                        width: 300,
                        height: 120,
                    }}
                >
                    <TextField
                        label='Ora de plecare'
                        value={'now'}
                        onChangeText={(departureTime) => this.setState({ departureTime })}
                    />
                    <SwitchSelector
                        options={options}
                        initial={0}
                        onPress={value => console.log('Call onPress with value: ', value)}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.offerRide({
                            direction: this.state.direction,
                            carPlaces: this.state.carPlaces,
                            departureTime: this.state.departureTime
                        });
                    }}
                    style={{
                        width: 150,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#3B5998',
                        margin: 15,
                    }}
                >
                    <Text style={{ color: 'white' }}> Adauga Oferta </Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default connect(null, actions)(OfferRide);
