import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

class MainScreen extends Component {
    componentDidMount() {
        if (_.isEmpty(this.props.homeLocation)) {
            console.log(' - Go To: choose home location screen');
            Actions.chooseHome();
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text> Ecanul prinicipal </Text>
                <TouchableOpacity
                    style={{
                        marginTop: 50,
                        padding: 10,
                        backgroundColor: '#3B5998',
                        width: 150,
                        alignItems: 'center',
                    }}
                    onPress={() => Actions.offerRide()}
                >
                    <Text style={{ color: 'white' }}> Ofera cursa azi </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginTop: 50,
                        padding: 10,
                        backgroundColor: '#3B5998',
                        width: 150,
                        alignItems: 'center',
                    }}
                    onPress={() => Actions.offerRide()}
                >
                    <Text style={{ color: 'white' }}> Ofera cursa maine </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        homeLocation: state.homeLocation,
    };
};

export default connect(mapStateToProps, null)(MainScreen);
